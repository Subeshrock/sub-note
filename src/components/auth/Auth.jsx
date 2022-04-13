import { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  Group,
  Box,
  PasswordInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { supabase } from "../../utils/supabaseClient";

function Auth() {
  const [already, setAlready] = useState(true);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const toggleAlready = () => {
    setAlready((prevVal) => !prevVal);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error, user } = await supabase.auth.signIn({
        email: form.values.email,
        password: form.values.password,
      });
      if (error) throw error;
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error, user, session } = await supabase.auth.signUp({
        email: form.values.email,
        password: form.values.password,
      });
      console.log(error, user, session);
      if (error) throw error;
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };

  // const handleAuth = () => {
  //   if (already) {
  //     handleLogin();
  //   } else {
  //     handleSignup();
  //   }
  // };

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  return (
    <Box sx={{ minWidth: 300, maxWidth: 400 }} mx="auto" mt="25vh">
      <form onSubmit={already ? handleLogin : handleSignup}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          required
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />

        <Group position="center" mt="md">
          <Button type="submit">{already ? "Login" : "Signup"}</Button>
        </Group>
      </form>
      {already ? (
        <Text size="xs" mt="xs">
          Don't have an Account
          <Text size="xs" variant="link" component="a" onClick={toggleAlready}>
            Signup
          </Text>
          instead.
        </Text>
      ) : (
        <Text size="xs" mt="xs">
          Aleardy an Account
          <Text size="xs" variant="link" component="a" onClick={toggleAlready}>
            Signin
          </Text>
          instead.
        </Text>
      )}
    </Box>
  );
}

export default Auth;
