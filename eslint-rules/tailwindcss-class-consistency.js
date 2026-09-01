 /** @type {import('eslint').Rule.RuleModule} */
 module.exports = {
   meta: {
     type: "suggestion",
     docs: {
       description: "Enforce consistent Tailwind CSS class usage and prevent arbitrary values",
       recommended: true,
     },
     schema: [],
     messages: {
       arbitraryValue:
         "Avoid arbitrary Tailwind values like '{{value}}'. Use design tokens or predefined classes instead.",
     },
   },
   create(context) {
     return {
       JSXAttribute(node) {
         if (node.name.type !== "JSXIdentifier" || node.name.name !== "className") {
           return;
         }

         let value = null;
         if (node.value && node.value.type === "Literal" && typeof node.value.value === "string") {
           value = node.value.value;
         } else if (
           node.value &&
           node.value.type === "JSXExpressionContainer" &&
           node.value.expression.type === "TemplateLiteral"
         ) {
           value = node.value.expression.quasis.map((q) => q.value.raw).join("");
         }

         if (!value) return;

         const classes = value.split(/\s+/);
         for (const cls of classes) {
           if (/\[.+\]/.test(cls)) {
             context.report({
               node,
               messageId: "arbitraryValue",
               data: { value: cls },
             });
           }
         }
       },
     };
   },
 };
