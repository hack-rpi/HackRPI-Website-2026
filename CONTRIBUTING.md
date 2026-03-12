# Contributing Guidelines 💻

Thank you for considering contributing to our project! We appreciate your time and effort. To ensure smooth collaboration with your co-contributors, please read and follow these guidelines.

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

RCOS Contributors and HackRPI Organizing Team Contributors, please read the section for [RCOS/HackRPI Contributors](#rcoshackrpi-contributors).

If you are not an RCOS Contributor, you are more than welcome to contribute too! Please read the section for [External Contributors](#external-contributors).

If you need help or are interested in getting involved further, please join our [HackRPI Organizing Team Discord Server](https://discord.gg/Pzmdt7FYnu).


### RCOS/HackRPI Contributors

To get write access to the repository, you must be a member of the HackRPI GitHub organization. If you are not a member of the organization, please contact the current Director of Technology to get added.

Since you have write access to the repository, you can directly clone and make changes to the repository.

        git clone https://github.com/hack-rpi/HackRPI-Website-2026.git

### External Contributors

Thank you for taking the time to contribute to our website! To contribute, please make a fork of the repository in GitHub and clone your fork.

        git clone <link-to-your-fork>

Once you're done, please make a pull request to the main repository. We will carefully consider your changes.

## How to Contribute

Take a look at our open issues on our [issues page](https://github.com/hack-rpi/HackRPI-Website-2024/issues) and begin working on an issue.

### Merging Code

Once you are satisfied with your feature and are ready to merge your changes into the rest of the codebase please follow the following steps.

1. Run `npm run build` to verify that the build passes.
1. Run `npx prettier --write .` to format your code to the same style as the rest of the repository
1. Run `npx eslint .eslintrc.js` to run linting checks to ensure a uniform code style and catch potential bugs.
1. Test your code thoroughly to ensure it looks and works well on mobile and on desktop.
1. Open a pull request into the main branch to get your code reviewed and merged.

## Code Style Guidelines

1. Use Typescript.
   1. For most pages there will be little to no JS functionality required for them and many will be purely HTML and CSS. But still please use TypeScript by using `.tsx` files instead of `.jsx`.
1. Use TailwindCSS.
   1. Tailwind can take a little while to get used to, and often it is great to have their [docs](https://tailwindcss.com/docs/installation) pinned / bookmarked. It does become very intuitive after a little while.
   1. If you are annoyed by the long class names Tailwind adds to the HTML, then I would recommend the [Inline Fold Extension for VSCode](https://marketplace.visualstudio.com/items?itemName=moalamri.inline-fold).
1. Don't repeat yourself.
   1. If you find that you are duplicating classes or elements, consider breaking them out into their own component so that they can be reused more easily.
   1. If you find yourself repeating code then try to refactor it out into another function.
1. Stick with the provided formatting.
   1. ESLint (Linter) and Prettier (Formatter) will help you with sticking with the provided formatting.
   1. You can run eslint with `npx eslint .eslintrc.js`
   1. You can run prettier to format the repository with `npx prettier --write .`
   1. Both of these will run automatically when you make your pull request but its good to stick with the formatting throughout development.

## Bug Reports

If you find a bug but aren't sure how to fix it, let us know by opening a [GitHub Issue](https://github.com/hack-rpi/HackRPI-Website-2026/issues/new)! In your bug reports, please include the following things:

1. Browser information, such as name and version
1. A description of the bug
1. Expected functionality
1. Steps to reproduce the bug
1. Screenshots (if you can get some)

## Feature Requests

Ideas flourish when people of all backgrounds contribute. Have a great idea but just not sure how to implement it? Let us know by opening a [GitHub Issue](https://github.com/hack-rpi/HackRPI-Website-2026/issues/new)!

## Pull Requests

In your Pull Requests, please include a general description of what you have changed. You don't have to be too detailed, but don't just leave the description body blank or with short phrases like "changing stuff." It's best to include full sentences and bullet points.

If you can include screenshots, please do so! It will make it easier for us to review.

All Pull Requests will usually be resolved at most 2 weeks after.

## License

This project is licensed under the MIT Open Source License. This means that you are free to see our source code, copy it, redistribute it, and use it for commercial purposes **without** a warranty.

For the full text, please see the [License](./LICENSE).