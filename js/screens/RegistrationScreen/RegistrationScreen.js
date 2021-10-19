import React, { useRef } from 'react'
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import styles from '../styles';

const RegistrationScreen = ({ navigation }) => {
    const { control, formState: { errors }, handleSubmit, watch, register } = useForm();
    const password = useRef({});
    password.current = watch('password', '');
    const onSubmit = data => console.log(data);

    return (
        <View style={styles.authFormContainer}>
            <Controller
                control={control}
                rules={{
                    required: 'Email is required to register',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Email"
                        mode="outlined"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.formInput}

                    />
                )}
                name="email"
                defaultValue=""
              />

              <View style={styles.errorMsg}>
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
              </View>

              <Controller
                control={control}
                rules={{
                required: "Password is required to register",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Password"
                        mode="outlined"
                        secureTextEntry
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.formInput}
                    />
                )}
                name="password"
                defaultValue=""
              />
              <View style={styles.errorMsg}>
                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
              </View>

              <Controller
                control={control}
                    rules={{
                        required: "Confirm password is required to register",
                        validate: (value) => value === password.current || 'The passwords does not match'
                              }}
                              render={({ field: { onChange, onBlur, value } }) => (
                                  <TextInput
                                      label="Confirm Password"
                                      mode="outlined"
                                      secureTextEntry
                                      onBlur={onBlur}
                                      onChangeText={onChange}
                                      value={value}
                                      style={styles.formInput}
                                  />
                              )}
                              name="confirmPass"
                              defaultValue=""
                            />

              <View style={styles.errorMsg}>
                {errors.confirmPass && <Text style={styles.errorText}>{errors.confirmPass.message}</Text>}
              </View>

              <Button
                mode="contained"
                compact={false}
                onPress={handleSubmit(onSubmit)}
                icon="account-plus"
                style={styles.submitButton}
              >
                Register Account
              </Button>

              <View style={styles.switchScreenText}>
                <Text> Already have an account? </Text>
              </View>

              <Button
                mode="outlined"
                style={styles.switchBtn}
                icon="account-arrow-right"
                compact
                onPress={() => navigation.navigate('Login')}
              >
                Login
              </Button>
            </View>
          )
        };

export default RegistrationScreen;