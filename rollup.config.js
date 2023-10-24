import typescript from "rollup-plugin-ts"
import {lezer} from "@lezer/generator/rollup"

export default {
  input: "src/lang-rc/src/index.ts",
  external: id => id != "tslib" && !/^(\.?\/|\w:)/.test(id),
  output: [
    {file: "src/lang-rc/dist/index.cjs", format: "cjs"},
    {dir: "./src/lang-rc/dist", format: "es"}
  ],
  plugins: [lezer(), typescript({ tsconfig: "./src/lang-rc/tsconfig.json" })]
}
