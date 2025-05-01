---
title: "Using MUI Components with React Hook Form: A Comprehensive Guide to TypeScript Integration"
lang: "en-US"
publish_at: 2024-11-27
category: "frontend"
Author: "@Emily D."
description: "This article delves into integrating React Hook Form with MUI's AutoComplete component, tackling the challenges of TypeScript type definitions."
visibility: true
cover_image_path: "/image/upload/v1728458492/nsokjadegdobuozybeya_ddi3do.jpg"
slug: "reusable-component-mui-hook-form-ts"
---

There are many examples online about using MUI components with React Hook Form, but when a form involves many customized `AutoComplete` components, creating a shared component becomes necessary. When developing a shared component, several TypeScript type issues need to be addressed, and depending on the requirements, some adjustments in props passing may also be required.

The basic usage of React Hook Form (RHF) with input fields will not be elaborated here, as the official documentation provides detailed explanations.

This post is lengthy due to the complexity of typing. If you are looking for the conclusion, you can find the code [here](https://codesandbox.io/p/sandbox/bitter-waterfall-47p8jp).

Note: React Hook Form will be abbreviated as RHF.

### Today, we’ll demonstrate the following requirements for an MUI AutoComplete component:

- Bind it to RHF.
- Enable text search via `TextField`.



#### Ignoring Typings for Now: Basic RHF Binding with MUI AutoComplete

Here’s what a basic MUI `AutoComplete` component bound to RHF would look like, ignoring TypeScript typings for now:

```typescript
export default function CustomAutoComplete({
  control, name, label, options,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={options}
          value={field.value}
          onChange={(_, newValue) => {
            field.onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
            />
          )}
        />
      )}
    />
  );
}
```

- `Controller`: A wrapper provided by RHF. While most basic input elements (such as `<input>` and `<select>`) can be directly registered using the `register` method, third-party UI libraries like MUI or Ant Design often use complex wrappers and do not support direct use of `ref`. This makes `register` unusable. The `Controller` acts as a bridge between the form and the component, allowing form binding and behavior control even with complex wrapped UI components. More usage details for `Controller` can be found in [the documentation](https://react-hook-form.com/docs/usecontroller/controller).

- `name`: Similar to the `name` attribute in traditional HTML inputs, it serves as a unique identifier for form elements. Using duplicate names for different form components may cause issues.

- `control`: Used with `useForm`, it acts as a more advanced version of `register` for complex components, helping RHF bind and register form elements.

- `render`: Used for rendering custom components. It takes parameters like `field`, `fieldState`, and `formState` for customization. You can pass the parameters you need according to your requirements. (Refer to the [documentation](https://react-hook-form.com/docs/usecontroller/controller).)
  - Note: Besides passing the `value` to make the component controlled, you also need to explicitly define `onChange` (as shown above). This is because MUI’s `AutoComplete` component takes `event` as the first parameter and `value` as the second parameter for its `onChange` method.

For example, if you want to display an error message below the component when there’s a validation error, you can use the `fieldState.error.message` property:

```typescript
<Controller
  name={name}
  control={control}
  render={({ field, fieldState }) => (
    <>
      <Autocomplete
        {...field}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
          />
        )}
      />
      {fieldState.error && (
        <Typography color="error">{fieldState.error.message}</Typography>
      )}
    </>
  )}
/>
```

This way, when RHF detects a validation error, the error message will be conditionally rendered below the component.

In this example, the required props to pass are as follows:

- For RHF binding:
  - `name`
  - `control`
  
- For MUI `AutoComplete`:
  - `options` (provides options for the user to select)

These three props form the basic version of the component. Later, we’ll add more variations.



#### Understanding `name` Typings in RHF

The official documentation defines the type of `name` as follows:

```typescript
export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;
```

This looks complicated, so let’s break it down step by step.

##### What is `FieldPath`?

1. It takes a generic type `TFieldValues`, which represents the structure of the form object defined when using `useForm`.
2. `FieldValues` is just a type alias for `Record<string, any>`, emphasizing that `TFieldValues` must be an object type.
3. `Path<TFieldValues>`: `Path` is a recursive type defined by RHF that parses and validates deep paths within an object.

For example:

```typescript
// Assume your form structure looks like this:
type FormValues = {
  username: string;
  profile: {
    firstName: string;
    lastName: string;
  };
};

const { control } = useForm<FormValues>();
```

In this case, valid `name` paths include:
- `username`
- `profile.firstName`
- `profile.lastName`

If you pass an invalid path, like `profile.whatever`, TypeScript will throw an error due to type mismatch.

Simplifying further, you can think of it like this:

```typescript
type Name<Form extends FieldValues> = Path<Form>;
```

Now that we understand that the type of `name` is essentially `Path<T>`, defining the props becomes much simpler:

```typescript
// CustomAutoComplete.tsx

import {
  type FieldValues, type Path,
} from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
};
```

With this generic parameter `T`, we can adapt to various form structures.





#### Defining `control` Typing

Next, let’s define the type for `control`. This is relatively simple:

```typescript
import {
  type Control, Controller, type FieldValues, type Path,
} from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};
```

Now, we’ve completed the TypeScript definitions for props related to RHF. 

When using the component, remember to pass `<T>` to ensure type checking works properly:

```typescript
type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

export default function CustomAutoComplete<T extends FieldValues>({
  control, name,
}: Props<T>) {

// your component code...
```



#### Diving into MUI `AutoComplete` Typings

The `options` prop is specific to the MUI `AutoComplete` component, so let’s define its prop type for seamless integration.

If you look at the `AutoComplete` type definition, it’s quite extensive:

```typescript
export default function Autocomplete<
  Value,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
>(
  props: AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>,
): JSX.Element;
```

You could copy and paste this into your component definition, but there’s a simpler way.

#### Using the `Parameters` Utility Type

TypeScript provides a utility type called `Parameters<T>`, where `T` must be a function type (`(...args: any) => any`). It extracts the parameters of the function as a tuple. ([Documentation](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype))

If you don’t pass a function type, it will return `never`.

Example:

```typescript
type MyFunction = (a: string, b: number) => boolean; 
type Params = Parameters<MyFunction>; // [string, number]
```

You can also use it for higher-order functions:

```typescript
function add(a: number, b: number): number {
  return a + b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

function execute(
  fn: (...args: Parameters<typeof add>) => number,
  ...args: Parameters<typeof add>
) {
  return fn(...args);
}

console.log(execute(add, 2, 3)); // 5
console.log(execute(multiply, 2, 3)); // 6
```

In our component, `Parameters` helps us extract the prop types without having to copy all the generic types:

```typescript
type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
} & Parameters<typeof Autocomplete>[0];
// Since it's a tuple, we use `[0]` to extract the first element, which contains the prop types.
```

However, `AutoComplete` still needs to know the values of its generic parameters, so we’ll need to pass them explicitly. 

For this, there are five parameters to pass:
- `Value` (customizable)
- `Multiple` (boolean)
- `DisableClearable` (boolean)
- `FreeSolo` (boolean)
- `ChipComponent` (`React.ElementType`)



#### Defining Generic Prop Types for `AutoComplete`

Here’s how we’ll define the types step by step:

Step 1: Pass all generic parameters, setting `Value` as a generic.

```typescript
type MuiAutoCompleteProps<K> = Parameters<typeof Autocomplete<
K, boolean, boolean, boolean, React.ElementType>>[0];
```

Step 2: Define a fixed type for `Value` since it will always have the same shape.

```typescript
type Option = {
  label: string;
  value: string;
};

type MuiAutoCompleteProps<K = Option> = Parameters<typeof Autocomplete<
K, boolean, boolean, boolean, React.ElementType>>[0];
```

Step 3: Since `renderInput` will be hardcoded in the component, we’ll need to `Omit` it from the props before merging it with `Props` to avoid duplication.

```typescript
type MuiAutoCompleteProps<K = Option> = Parameters<typeof Autocomplete<
K, boolean, boolean, boolean, React.ElementType>>[0];

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: React.ReactNode;
} & Omit<MuiAutoCompleteProps, 'renderInput'>;
```


#### Final Implementation of the Component

Here’s what the component looks like:

```typescript
import { Autocomplete, TextField, Typography } from '@mui/material';
import {
  type Control, Controller, type FieldValues, type Path,
} from 'react-hook-form';

type Option = {
  label: string;
  value: string;
};

type MuiAutoCompleteProps<K = Option> = Parameters<typeof Autocomplete<
K, boolean, boolean, boolean, React.ElementType>>[0];

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
} & Omit<MuiAutoCompleteProps, 'renderInput'>;

export default function CustomAutoComplete<T extends FieldValues>({
  control, name, ...autocompleteProps
}: Props<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <Autocomplete
            {...field}
            value={field.value}
            onChange={(_, newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
              />
            )}
            {...autocompleteProps}
          />
          {fieldState.error && (
            <Typography color="error">{fieldState.error.message}</Typography>
          )}
        </>
      )}
    />
  );
}
```


#### Adding Customizable Props

Here’s the final version with additional customizable props:

```typescript
import React from 'react';
import {
  Controller,
  type Path,
  type FieldValues,
  type Control,
  type UseControllerProps,
} from 'react-hook-form';
import {
  type TextFieldProps,
  Autocomplete as MuiAutoComplete,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

type Option = {
  label: string;
  value: string;
};

type MuiAutoCompleteProps<K = Option> = Parameters<
  typeof MuiAutoComplete<K, boolean, boolean, boolean, React.ElementType>
>[0];

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  controllerProps?: Omit<UseControllerProps<T>, 'name' | 'control'>;
  textFieldProps?: TextFieldProps;
} & Omit<MuiAutoCompleteProps, 'renderInput'>;

const AutoComplete = <T extends FieldValues>({
  name,
  control,
  options,
  multiple = false,
  label = '',
  placeholder = '',
  controllerProps = {},
  textFieldProps = {},
  ...autoCompleteProps
}: Props<T>) => (
  <Controller
    name={name}
    control={control}
    {...controllerProps}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <MuiAutoComplete
        multiple={multiple}
        disableCloseOnSelect={multiple}
        filterSelectedOptions={multiple}
        options={options}
        value={value}
        onChange={(_, newValue) => {
          onChange(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            error={!!error}
            helperText={error?.message}
            {...textFieldProps}
          />
        )}
        {...autoCompleteProps}
      />
    )}
  />
);

export default AutoComplete;
```


Additional settings (e.g., `multiple`, `ChipProps`, etc.) can be found [here](https://codesandbox.io/p/sandbox/bitter-waterfall-47p8jp). Solving the typing issues alone took me nearly a day. I hope this post helps others working on shared components!