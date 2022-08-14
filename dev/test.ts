import SlimSelect from "../src/";

let selectors = ['single', 'multiple', 'single-group', 'multiple-group'];
selectors.forEach(selector => new SlimSelect({ select: `#${selector}` }));