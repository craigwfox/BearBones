# 🐻 BearBones front-end toolkit

A bare bones front-end project starter with minimal CSS and JS.

## Sections

- [CSS](#CSS)
- [JS](#JS)

## Base file structure

- .gitignore
- .prettier
- .browserlistrc
- src
  - sass
  - js

---

## CSS

The CSS will be based on the [CUBE CSS methodology](https://cube.fyi/).

### Global

This is where things like resets, variables, and global mixin files will live.

**Examples**

- reset
- variables
- mixins

### Composition

This set's the base skeleton / look in feel of the site. Things like the base font styles, margin and padding between typographic elements are set here.

**Examples**

- type
- base structure

### Utilities

This section will consist of one off utility classes. Think generic wrappers or more often than not classes based on [Design tokens](https://css-tricks.com/what-are-design-tokens/), background and color classes and maybe some generic margin and padding classes. I try to stick with a few good utility classes and avoid having a dozen utilities on each element, when that happens it's probably a sign that this should be new [block](#blocks).

While I generally don't like using something like tailwind for the entire site, using it or a similar tool to generate these few utility classes is useful.

**Examples**

- wrappers
- backgrounds
- colors

### Blocks

This is where we start really defining specific styles of the page. This starter will provide some starter files / classes for this, but will probably not include much of any styling.

**Examples**

- cards
- hero sections
- navigation

### Exceptions

These are overrides for the [blocks](#blocks), and they will be defined in the block file itself.

**Some examples of this would be:**

- alternate card background color
- reverse hero section

### Example SASS file structure

- styles.scss
- /global
  - \_reset.scss
  - \_variables.scss
  - \_mixins.scss
- /utilities
  - \_wrappers.scss
  - \_backgrounds.scss
  - \_colors.scss
- /blocks
  - \_cards.scss.scss
  - \_hero.scss.scss
  - \_navigation.scss.scss

---

## JS

The goal is to include only a few commonly used bits of JS in the form of web components. Some of these will be things made specifically for this starter and others may pull in other open source web components.

In the end I would like to have a way to pick and choose which components are needed and then build those out into a single js file.

- Tabbed content
- Modals
- Slider
