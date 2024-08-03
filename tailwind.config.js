/** @type {import("tailwindcss").Config} */
module.exports = {
    content: ["cmd/clipr/template/**/*.{html,js}"],
    theme: {
        extend: {
            fontFamily: { jbmono: ["JetBrains Mono", "monospace"] },
        },
    },
    plugins: [],
};
