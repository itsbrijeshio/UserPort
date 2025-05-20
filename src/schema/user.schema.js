const zod = require("zod");

const nameSchema = zod.string({
  required_error: "Name is required",
  invalid_type_error: "Name must be a string",
});

const emailSchema = zod.string({
  required_error: "Email is required",
  invalid_type_error: "Email must be a string",
});

const passwordSchema = zod.string({
  required_error: "Password is required",
  invalid_type_error: "Password must be a string",
});

const signupSchema = zod
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

const signinSchema = zod
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

module.exports = {
  signupSchema,
  signinSchema,
};
