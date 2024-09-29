import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

type IFormInputProps = {
  name: string;
} & TextInputProps;

export const FormInput = ({
  name,
  style,
  defaultValue = "",
  ...otherProps
}: IFormInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      key={name}
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onBlur, onChange, value } }) => (
        <>
          <TextInput
            mode="outlined"
            error={!!errors[name]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            style={[styles.input, style]}
            {...otherProps}
          />
          {errors[name] ? (
            <HelperText
              type="error"
              style={{ paddingVertical: 0, alignSelf: "flex-start" }}
            >
              {String(errors[name]?.message)}
            </HelperText>
          ) : null}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    zIndex: 0,
    width: "100%",
  },
});
