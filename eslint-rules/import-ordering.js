 /** @type {import('eslint').Rule.RuleModule} */
 module.exports = {
   meta: {
     type: "suggestion",
     docs: {
       description: "Enforce consistent import ordering",
       recommended: true,
     },
     fixable: "code",
     schema: [],
     messages: {
       wrongOrder:
         "Imports should be ordered: builtin → external → internal → relative. '{{current}}' should come before '{{previous}}'.",
     },
   },
   create(context) {
     const sourceCode = context.getSourceCode();

     function getImportGroup(source) {
       if (!source) return 4;
       const value = typeof source === "string" ? source : source.value;
       if (!value) return 4;

       // Node builtins
       if (
         /^(node:|assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib)/.test(
           value,
         )
       ) {
         return 0;
       }

       // Relative imports
       if (value.startsWith(".")) {
         return 3;
       }

       // Internal aliases (e.g., @/)
       if (value.startsWith("@/")) {
         return 2;
       }

       // External packages
       return 1;
     }

     return {
       Program(node) {
         const imports = node.body.filter(
           (n) => n.type === "ImportDeclaration",
         );

         if (imports.length < 2) return;

         let prevGroup = -1;
         let prevNode = null;

         for (const imp of imports) {
           const group = getImportGroup(imp.source);

           if (group < prevGroup) {
             context.report({
               node: imp,
               messageId: "wrongOrder",
               data: {
                 current: imp.source?.value || "unknown",
                 previous: prevNode?.source?.value || "unknown",
               },
             });
           }

           prevGroup = group;
           prevNode = imp;
         }
       },
     };
   },
 };
