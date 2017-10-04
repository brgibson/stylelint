"use strict"

const functionArgumentsSearch = require("../../utils/functionArgumentsSearch")
const report = require("../../utils/report")
const ruleMessages = require("../../utils/ruleMessages")
const validateOptions = require("../../utils/validateOptions")
const postcss = require("postcss")

const ruleName = "function-linear-gradient-no-transparent"

const messages = ruleMessages(ruleName, {
  rejected: "Safari and firefox issue with 'transparent' in gradients -(use transparentize) -https://github.com/jakubpawlowicz/clean-css/issues/315 -https://codepen.io/cvn/pen/ozewK",
})

const rule = function (actual) {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, { actual })
    if (!validOptions) {
      return
    }

    root.walkDecls(decl => {
      functionArgumentsSearch(decl.toString().toLowerCase(), "linear-gradient", (expression, expressionIndex) => {
        const firstArg = expression.split(",")[0].trim()

        // If the first character is a number, we can assume the user intends an angle
        if (/transparent[^a-zA-Z]/.test(expression)) {
          complain()
          return
        }

        function complain() {
          report({
            message: messages.rejected,
            node: decl,
            index: expressionIndex,
            result,
            ruleName,
          })
        }
      })
    })
  }
}

rule.ruleName = ruleName
rule.messages = messages
module.exports = rule
