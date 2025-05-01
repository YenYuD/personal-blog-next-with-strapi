---
title: "如何寫一個 MUI AutoComplete 搭配 React-hook-form 和 TypeScript 的共用元件"
lang: "zh-TW"
date: 2024-11-21
category: "frontend"
Author: "@Emily D."
description: "如何寫一個 MUI AutoComplete 搭配 React hook form 和 TypeScript 的共用元件"
visibility: true
cover_image_path: "/image/upload/v1728458492/nsokjadegdobuozybeya_ddi3do.jpg"
slug: "reusable-component-mui-hook-form-ts"
---


網路上關於MUI 元件和 React-hook-form 的使用範例有很多，但有時當表單有大量的客製化 AutoComplete 元件需要使用，就必須做一個共用元件。在製作共用元件時，會有一些需要解決的TypeScript 型別問題，根據需求不同也可能做一些 Props 傳遞上的調整。
基本的 React-hook-form 搭配 input 的使用方法這邊就不多贅述，官方文件已有詳細說明。

這篇因為型別很搞剛所以非常冗長，想看結論的話 [這裡](https://codesandbox.io/p/sandbox/bitter-waterfall-47p8jp) 有程式碼連結。

註：React-hook-form 以下簡稱RHF。

今天我們將會示範以下需求的 MUI AutoComplete 元件：

1.綁定 RHF
2.可輸入搜尋（TextField)

首先，暫時忽略型別的部分，一個綁定 RHF 的 MUI AutoComplete 雛形大概會長這樣：

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
              field.onChange(newValue)
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
  )
}
```

`Controller` :  RHF提供的一個 Wrapper，大部分基本的 input element（如 `<input>`、`<select>`）可以直接使用 `register` 方法來註冊。但當涉及到第三方 UI 元件庫時（如 MUI、Antd 等），這些元件通常包裝複雜且不支援直接使用  `ref` ，這使得 `register` 無法正常工作。有了 Controller，就像是表單和元件兩者之間的橋樑，讓你就算有層層包裹的 UI 元件，仍然能夠進行綁定和進行表單行為控制。

更多 Controller 的使用方法，在[這裡](https://react-hook-form.com/docs/usecontroller/controller)可以找得到。

`name` : 和傳統 HTML input 的 name 屬性類似，都是做為表單元素的唯一識別名稱。若 name 和別的表單元件重複，可能會出現問題。

`control` : 搭配  `useForm`  做使用，可以當成用在更複雜元件的 `register`，幫助 RHF 註冊和綁定表單元件。

`render` : 用來渲染自定義元件。以函數形式呈現，提供參數  `field`, `fieldState` ,`formState` 做客製化使用。可根據需求傳遞需要的參數。（[文件](https://react-hook-form.com/docs/usecontroller/controller)）
註：除了需要傳value 讓元件變成 Controlled 以外，還需要另外寫 onChange（範例如上），因為MUI AutoComplete 元件的第一個參數是 event，第二個參數才是 value。

舉例來說，我今天需要在表單有錯誤時顯示 error message 在元件下方，我就可以使用 `fieldState.error.message`  屬性：

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

這樣在RHF檢查出驗證錯誤的時候，錯誤訊息就會隨著條件渲染。
在這個範例中，我們會需要傳進來的 Props 有以下：

給 RHF 做綁定的:
- name
- control

給 MUI AutoComplete 使用的：
- options （提供使用者的選項）

這三個 Props，是做出這個元件的基本款，稍後我們可以再多做一些變化。
接著我們來看型別。

RHF 官方文件中，對 name 的型別定義如下：

```typescript
export type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>
```

有點複雜，讓我們來仔細拆解。

> 什麼是 FieldPath? 

- 需要帶一個 generic type `TFieldValues` ，這個 type 會是你在使用 useForm 時所定義出的表單物件結構。
-  `FieldValues` 就只是一個定義物件的型別 `Record<string,any>` ，強調 `TFieldValues` 必須是物件型態。
- `Path<TFieldValues>` : `Path` 是RHF自定義的一個 Recursive Type，它會解析並驗證物件的深層路徑。舉個例子：

```typescript

// 假如你的表單結構長這樣：
type FormValues = {
  username: string;
  profile: {
    firstName: string;
    lastName: string;
  };
};


const { control } = useForm<FormValues>()

```
 
那麼在這個狀況下，你的 `name` 可以是以下路徑：
- `username`
- `profile.firstName`
- `profile.lastName`

假如你傳了不合規定的 name ，比如 `profile.whatever` ，TypeScript 就會因為型別不符合而報錯。
再白話一點，其實可以當作是這樣的：

```typescript
type Name<Form extends FieldValues> = Path<Form>
// a more simple version: type Name<T> = Path<T>
```

OK，現在我們知道，name 的 type 實際上叫做 `Path<T>` ，這樣一來定義Props就簡單很多。

``` typescript
// CustomAutoComplete.tsx

import {
  type FieldValues, type Path,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
  name: Path<T>
}
```

藉由這個泛型參數T，我們就可以適配各種不同的表單結構。
接著我們也補上 `control` 的型別。這個比較簡單：

```typescript
import {
  type Control, Controller, type FieldValues, type Path,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
}
```

現在我們已經完成 RHF 相關的 Props的型別定義了。
記得要在使用元件時也帶入 `<T>` ，否則型別檢查就會無法運作。

```typescript
type Props<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
}

export default function CustomAutoComplete<T extends FieldValues>({
  control, name,
}: Props<T>) {

// your component...

```

再來，我們進到 MUI 的環節。
`options` 是 `AutoComplete` 元件的Props ，所以我們接下來要來定義 AutoComplete 元件 Props的型別，以便我們在使用元件時能直接傳入。

進到AutoComplete的型別檔，會看到這一大包：

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


你當然可以選擇直接複製這一堆，貼到你的元件上。 但其實有一個更簡便的做法。

> Parameters Utility Type

TypeScript 提供的 `Parameters<T>` ，`T` 的型別必須符合 `(...args: any) => any`
作用是幫你拿出T函式中的參數，並做成一個tuple。 ([文件](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype))
如果你不是帶入函數型別，則會回傳 `never`。

舉個例子，

```typescript
type MyFunction = (a: string, b: number) => boolean; 
type Params = Parameters<MyFunction>; // [string, number]
```

你也可以將它用在高階函式：

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

console.log(execute(add,2,3)) // 5
console.log(execute(multuiply,2,3)) //6

```

在我們的元件中，使用 `Parameters` 可以協助我們將 props 的型別取出，不用再複製一次所有的 generic type。

```typescript
type Props<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
} & Parameters<typeof Autocomplete>[0]
// [props: AutocompleteProps<unknown, boolean | undefined, boolean | undefined, boolean | undefined, ElementType<any>>]
// 因為是tuple，所以需要用[0]把第一項取出來才是props的型別
```

但是 AutoComplete 仍然需要知道 generic 的值為何，所以我們仍然需要將參數帶進去。
在這邊我們有五個參數要傳：
- Value（自定義）
- Multiple (boolean)
- DisableClearable (boolean)
- FreeSolo (boolean) 
- ChipComponent (React.ElementType)

```typescript

// Step 1 : 帶進所有的參數，將 Value 設為generic

type MuiAutoCompleteProps<K> = Parameters<typeof Autocomplete<
K, boolean, boolean, boolean, React.ElementType>>[0]

// Step 2: 由於我的元件的 Value 型態都會是固定的，我直接定義在元件中。

type Option = {
  label: string
  value: string
}

type MuiAutoCompleteProps<K = Option> = Parameters<typeof Autocomplete<
K, boolean, boolean, boolean, React.ElementType>>[0]

// Step 3: 由於 `renderInput` 我是直接寫死在元件裡，這邊會需要先Omit掉，再merge進 Prop type中。否則會重複定義。

type Option = {
  label: string
  value: string
}

type MuiAutoCompleteProps<K = Option> = Parameters<typeof Autocomplete<
K, boolean, boolean, boolean, React.ElementType>>[0]

type Props<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label: React.ReactNode
} & Omit<MuiAutoCompleteProps, 'renderInput'>

```


現在我們來看一眼元件長什麼樣子：

```typescript

import { Autocomplete, TextField, Typography } from '@mui/material'
import {
  type Control, Controller, type FieldValues, type Path,
} from 'react-hook-form'

type Option = {
  label: string
  value: string
}

type MuiAutoCompleteProps<K = Option> = Parameters<typeof Autocomplete<
K, boolean, boolean, boolean, React.ElementType>>[0]

type Props<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
} & Omit<MuiAutoCompleteProps, 'renderInput'>

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
              field.onChange(newValue)
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
  )
}


```

再加上一些客製化的 props ，這個元件就可以大功告成：

```typescript

import React from "react";
import {
  Controller,
  type Path,
  type FieldValues,
  type Control,
  type UseControllerProps,
} from "react-hook-form";
import {
  type TextFieldProps,
  Autocomplete as MuiAutoComplete,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type Option = {
  label: string;
  value: string
};

type MuiAutoCompleteProps<K = Option> = Parameters<
  typeof MuiAutoComplete<K, boolean, boolean, boolean, React.ElementType>
>[0];

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  controllerProps?: Omit<UseControllerProps<T>, "name" | "control">;
  textFieldProps?: TextFieldProps;
} & Omit<MuiAutoCompleteProps, "renderInput">;

const AutoComplete = <T extends FieldValues>({
  name,
  control,
  options,
  multiple = false,
  label = "",
  placeholder = "",
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
        renderOption={(props, option) => {
          const { ...optionProps } = props;
          return (
            <li {...optionProps} key={option.label}>
              <Stack>
                <Typography>{option.label}</Typography>
                <Typography>{option.description}</Typography>
              </Stack>
            </li>
          );
        }}
        {...autoCompleteProps}
      />
    )}
  />
);

export default AutoComplete;



```


此外，還有一些其他比較細部的設定(multiple , ChipProps 等等)，可以在 [這裡](https://codesandbox.io/p/sandbox/bitter-waterfall-47p8jp)  看到。
光解決型別問題就花了我快一天，希望這篇文章可以幫助到正在寫共用元件的人！




