# Contributing Guidelines 💻

Thank you for considering contributing to our project. We appreciate your time and effort. To support effective collaboration, please review and follow these guidelines.

## Table of Contents

- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Code Style](#code-style)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)
- [Pull Requests](#pull-requests)
- [License](#license)

## Getting Started

The project is developed in collaboration with Rensselaer Center for Open Source (RCOS).

RCOS and HackRPI Contributors should review the section for [RCOS/HackRPI Contributors](#rcoshackrpi-contributors).

If you are not an RCOS or HackRPI Contributor, you are welcome to contribute. Please refer to the [External Contributors](#external-contributors) section.

If you need assistance or wish to become more involved, please join our [HackRPI Organizing Team Discord Server](https://discord.gg/Pzmdt7FYnu).


### RCOS/HackRPI Contributors

To obtain write access to the repository, you must be a member of the HackRPI GitHub organization. If you are not a member, contact the current Director of Technology to request access.

With write access, you may clone the repository directly and make changes.

        git clone https://github.com/hack-rpi/HackRPI-Website-2026.git

### External Contributors

Thank you for contributing to our website. To get started, please fork the repository on GitHub and clone your fork.

        git clone <link-to-your-fork>

When your changes are ready, submit a pull request to the main repository. We will review your submission promptly.

## How to Contribute

Review the open issues on our [issues page](https://github.com/hack-rpi/HackRPI-Website-2024/issues) and select one to work on.

### Merging Code

When your feature is complete and ready to merge, please follow these steps.

1. Run `npm install` to make sure all packages on your branch are installed.
1. Run `npm run format` to format your code to the same style as the rest of the repository.
   1. Alternatively, run `npm run format:check` to check your formatting without modifying your files.
1. Run `npm run lint` to ensure a uniform code style and catch potential bugs.
1. Run `npm run lint:fix` to apply safe automatic lint fixes when appropriate.
1. Run `npm run typecheck` to verify your TypeScript.
1. Do not disable ESLint rules without providing a justification. Whenever possible, address the underlying issue.
1. Avoid formatting unrelated files. Keep pull request changes focused and relevant.
1. Before opening a pull request, ensure that formatting, linting, and type-checking all pass.
1. Test your code thoroughly to confirm it functions and displays correctly on both mobile and desktop devices.
1. Open a pull request to the main branch for code review and merging.

## Code Style Guidelines

1. Use Typescript.
   1. Most pages require minimal JavaScript and may use only HTML and CSS. However, please use TypeScript by creating `.tsx` files instead of `.jsx` files.
1. Use Tailwind CSS.
   1. Tailwind may take some time to learn. Pinning or bookmarking its [documentation](https://tailwindcss.com/docs/installation) is helpful, and it becomes intuitive with use.
   1. If you find Tailwind's long class names challenging, consider using the [Inline Fold Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=moalamri.inline-fold).
1. Don't repeat yourself.
   1. If you notice duplicated classes or elements, consider creating reusable components.
   1. If you are repeating code, refactor it into a separate function.
1. Stick with the provided formatting.
   1. ESLint (Linter) and Prettier (Formatter) will help you stick with the provided formatting.
   1. You can run ESLint with `npm run lint`.
   1. You can run Prettier to format the repository with `npm run format`.

## Bug Reports

If you discover a bug and are unsure how to resolve it, please open a [GitHub Issue](https://github.com/hack-rpi/HackRPI-Website-2026/issues/new)!
Include the following information in your report:

1. Browser information, such as name and version
1. A description of the bug
1. Expected functionality
1. Steps to reproduce the bug
1. Screenshots (if you can get some)

## Feature Requests

We welcome ideas from contributors of all backgrounds.
If you have a suggestion but are unsure how to implement it, please open a [GitHub Issue](https://github.com/hack-rpi/HackRPI-Website-2026/issues/new)!

## Pull Requests

In your pull requests, include a general description of your changes. Avoid leaving the description blank or using vague phrases. Use complete sentences and bullet points where appropriate.

If possible, include screenshots to facilitate the review process.

Most pull requests are reviewed and resolved within two weeks.

## License

This project is licensed under the MIT Open Source License. You may view, copy, redistribute, and use the source code for commercial purposes, but it is provided **without** a warranty.

For the full text, please see the [License](./LICENSE).
