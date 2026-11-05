"use client";

import { useMemo, useRef, useState } from "react";
import styles from "./page.module.css";

type EmailRow = {
  id: number;
  values: Record<string, string>;
};

const initialVariables = ["email", "first_name", "company"];

const initialEmails: EmailRow[] = [
  {
    id: 1,
    values: {
      email: "maya@example.com",
      first_name: "Maya",
      company: "Acme Inc.",
    },
  },
  {
    id: 2,
    values: {
      email: "james@example.com",
      first_name: "James",
      company: "Northstar",
    },
  },
  {
    id: 3,
    values: {
      email: "alex@example.com",
      first_name: "Alex",
      company: "Contoso",
    },
  },
];

function parseCSV(text: string): string[][] {
    // Remove a possible UTF-8 BOM.
    const input = text.replace(/^\uFEFF/, "");
    const rows: string[][] = [];
  
    let row: string[] = [];
    let field = "";
    let inQuotes = false;
  
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
  
      if (inQuotes) {
        if (char === '"') {
          if (input[i + 1] === '"') {
            field += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          field += char;
        }
      } else if (char === '"' && field.length === 0) {
        inQuotes = true;
      } else if (char === ",") {
        row.push(field);
        field = "";
      } else if (char === "\n" || char === "\r") {
        if (char === "\r" && input[i + 1] === "\n") {
          i++;
        }
  
        row.push(field);
  
        if (row.some((value) => value.trim() !== "")) {
          rows.push(row);
        }
  
        row = [];
        field = "";
      } else {
        field += char;
      }
    }
  
    if (inQuotes) {
      throw new Error("The CSV contains an unclosed quoted field.");
    }
  
    // Include the final row if the file doesn't end with a newline.
    row.push(field);
  
    if (row.some((value) => value.trim() !== "")) {
      rows.push(row);
    }
  
    return rows;
  }

export default function Home() {
  const [variables, setVariables] = useState(initialVariables);
  const [emails, setEmails] = useState(initialEmails);
  const [selectedId, setSelectedId] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const [template, setTemplate] = useState(
    "Hello {first_name},\n\n" +
      "I'm reaching out to you at {company}.\n\n" +
      "We will send further details to {email}.\n\n" +
      "Best regards"
  );

  const selectedEmail =
    emails.find((email) => email.id === selectedId) ?? emails[0];

  // Find variables such as {first_name} in the template.
  // Any unknown variables automatically become new columns.
  function handleTemplateChange(value: string) {
    setTemplate(value);

    const matches = [...value.matchAll(
      /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g
    )];

    const discovered = [...new Set(matches.map((match) => match[1]))];

    setVariables((current) => {
      const missing = discovered.filter(
        (variable) => !current.includes(variable)
      );

      if (missing.length === 0) return current;

      return [...current, ...missing];
    });

    // Initialize any newly discovered variables for every email.
    setEmails((current) =>
      current.map((email) => {
        const nextValues = { ...email.values };

        for (const variable of discovered) {
          if (!(variable in nextValues)) {
            nextValues[variable] = "";
          }
        }

        return { ...email, values: nextValues };
      })
    );
  }

  // Update one variable for one email.
  function updateCell(
    emailId: number,
    variable: string,
    value: string
  ) {
    setEmails((current) =>
      current.map((email) =>
        email.id === emailId
          ? {
              ...email,
              values: { ...email.values, [variable]: value },
            }
          : email
      )
    );
  }

  function addEmail() {
    const id = Math.max(0, ...emails.map((email) => email.id)) + 1;

    const values: Record<string, string> = {};
    for (const variable of variables) {
      values[variable] = "";
    }

    values.email = "";

    setEmails((current) => [...current, { id, values }]);
    setSelectedId(id);
  }

  // Substitute variables using the currently selected email.
  const preview = useMemo(() => {
    if (!selectedEmail) return "";

    return template.replace(
      /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g,
      (placeholder, variable: string) => {
        const value = selectedEmail.values[variable];

        // Keep unknown or unpopulated placeholders visible.
        return value?.trim() ? value : placeholder;
      }
    );
  }, [template, selectedEmail]);

  async function handleCSVImport(file: File) {
    try {
      const text = await file.text();
      const parsed = parseCSV(text);
  
      if (parsed.length < 2) {
        throw new Error(
          "The CSV must contain a header row and at least one email."
        );
      }
  
      // Normalize headers into usable variable names.
      const headers: string[] = [];
      const seen = new Set<string>();
  
      parsed[0].forEach((rawHeader, index) => {
        const base =
          rawHeader
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "") || `column_${index + 1}`;
  
        let header = base;
        let suffix = 2;
  
        while (seen.has(header)) {
          header = `${base}_${suffix++}`;
        }
  
        seen.add(header);
        headers.push(header);
      });
  
      // Ensure every row has an email field.
      if (!headers.includes("email")) {
        headers.unshift("email");
      }
  
      const importedEmails: EmailRow[] = parsed
        .slice(1)
        .map((row, index) => {
          const values: Record<string, string> = {};
  
          headers.forEach((header) => {
            const originalIndex = parsed[0]
              .map((h) =>
                h
                  .trim()
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "_")
                  .replace(/^_+|_+$/g, "")
              )
              .indexOf(header);
  
            values[header] =
              originalIndex >= 0 ? (row[originalIndex] ?? "").trim() : "";
          });
  
          return {
            id: index + 1,
            values,
          };
        });
  
      if (importedEmails.length === 0) {
        throw new Error("No email rows were found in the CSV.");
      }
  
      setVariables(headers);
      setEmails(importedEmails);
      setSelectedId(importedEmails[0].id);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Unable to import this CSV file."
      );
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.workspace}>
        {/* LEFT: Email table */}
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.heading}>Email recipients</h2>
              <p className={styles.subtitle}>
                {emails.length} recipients · {variables.length} variables
              </p>
            </div>

            <div className={styles.headerActions}>
            <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                hidden
                onChange={async (event) => {
                const file = event.target.files?.[0];

                if (file) {
                    await handleCSVImport(file);
                }

                // Allow importing the same file again.
                event.target.value = "";
                }}
            />

            <button
                className={styles.importButton}
                type="button"
                onClick={() => fileInputRef.current?.click()}
            >
                Import CSV
            </button>

            <button
                className={styles.addButton}
                type="button"
                onClick={addEmail}
            >
                + Add email
            </button>
            </div>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Recipient</th>
                  {variables.map((variable) => (
                    <th key={variable}>
                      <code>{"{" + variable + "}"}</code>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {emails.map((email) => (
                  <tr
                    key={email.id}
                    className={
                      email.id === selectedId ? styles.selectedRow : ""
                    }
                    onClick={() => setSelectedId(email.id)}
                  >
                    <td>
                      <button
                        type="button"
                        className={styles.recipientButton}
                        onClick={() => setSelectedId(email.id)}
                      >
                        {email.values.email || `Email ${email.id}`}
                      </button>
                    </td>

                    {variables.map((variable) => (
                      <td key={variable}>
                        <input
                          className={styles.cellInput}
                          aria-label={`Email ${email.id}: ${variable}`}
                          value={email.values[variable] ?? ""}
                          onClick={(event) => event.stopPropagation()}
                          onChange={(event) =>
                            updateCell(
                              email.id,
                              variable,
                              event.target.value
                            )
                          }
                          placeholder={`Enter ${variable}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={styles.hint}>
            Select a row to preview that recipient's email. Edit any cell
            to change its variable value.
          </p>
        </section>

        {/* RIGHT: Template editor and resolved preview */}
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.heading}>Email template</h2>
              <p className={styles.subtitle}>
                Use {"{variable_name}"} to insert a variable
              </p>
            </div>
          </div>

          <div className={styles.editorArea}>
            <label className={styles.fieldLabel} htmlFor="email-template">
              Template
            </label>

            <div className={styles.editorWrapper}>
            {/* Highlighting layer */}
            <div
                ref={highlightRef}
                className={styles.highlightLayer}
                aria-hidden="true"
            >
                {template
                .split(/(\{[a-zA-Z_][a-zA-Z0-9_]*\})/g)
                .map((part, index) =>
                    /^\{[a-zA-Z_][a-zA-Z0-9_]*\}$/.test(part) ? (
                    <span className={styles.variableHighlight} key={index}>
                        {part}
                    </span>
                    ) : (
                    <span key={index}>{part}</span>
                    )
                )}
                {"\n"}
            </div>

            {/* Actual editable textarea */}
            <textarea
                id="email-template"
                className={styles.textbox}
                value={template}
                onChange={(event) => handleTemplateChange(event.target.value)}
                onScroll={(event) => {
                if (highlightRef.current) {
                    highlightRef.current.scrollTop = event.currentTarget.scrollTop;
                    highlightRef.current.scrollLeft = event.currentTarget.scrollLeft;
                }
                }}
                placeholder={"Hello {first_name},\n\nYour message goes here..."}
                spellCheck
            />
            </div>


            <div className={styles.previewHeader}>
              <label className={styles.fieldLabel} htmlFor="preview">
                Preview
              </label>

              <select
                className={styles.recipientSelect}
                value={selectedId}
                onChange={(event) =>
                  setSelectedId(Number(event.target.value))
                }
                aria-label="Preview recipient"
              >
                {emails.map((email) => (
                  <option key={email.id} value={email.id}>
                    {email.values.email || `Email ${email.id}`}
                  </option>
                ))}
              </select>
            </div>

            <div id="preview" className={styles.preview}>
              {preview || "Your rendered email will appear here."}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

