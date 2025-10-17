import { useMutation } from "@tanstack/react-query";

import { login } from "../services/auth";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: login,
  });
