import { ZodSchema, ZodTypeDef } from "zod";
import { Refs, Seen } from "./Refs";
import { JsonSchema7Type } from "./parseDef";

export type Targets = "jsonSchema7" | "jsonSchema2019-09" | "openApi3";

export type DateStrategy =
  | "format:date-time"
  | "format:date"
  | "string"
  | "integer";

export const ignoreOverride = Symbol(
  "Let zodToJsonSchema decide on which parser to use",
);

export type Options<Target extends Targets = "jsonSchema7"> = {
  name: string | undefined;
  $refStrategy: "root" | "relative" | "none" | "seen";
  basePath: string[];
  effectStrategy: "input" | "any";
  pipeStrategy: "input" | "output" | "all";
  dateStrategy: DateStrategy | DateStrategy[];
  mapStrategy: "entries" | "record";
  removeAdditionalStrategy: "passthrough" | "strict";
  target: Target;
  strictUnions: boolean;
  definitionPath: string;
  definitions: Record<string, ZodSchema>;
  errorMessages: boolean;
  markdownDescription: boolean;
  patternStrategy: "escape" | "preserve";
  emailStrategy: "format:email" | "format:idn-email" | "pattern:zod";
  override?: (
    def: ZodTypeDef,
    refs: Refs,
    seen: Seen | undefined,
    forceResolution?: boolean,
  ) => JsonSchema7Type | undefined | typeof ignoreOverride;
};

export const defaultOptions: Options = {
  name: undefined,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: false,
  definitions: {},
  errorMessages: false,
  markdownDescription: false,
  patternStrategy: "escape",
  emailStrategy: "format:email",
};

export const getDefaultOptions = <Target extends Targets>(
  options: Partial<Options<Target>> | string | undefined,
) =>
  (typeof options === "string"
    ? {
        ...defaultOptions,
        name: options,
      }
    : {
        ...defaultOptions,
        ...options,
      }) as Options<Target>;
