"use server";

import type { ServerActionState } from "@/types";

const disabledState: ServerActionState = {
  status: "error",
  message: "Auth disabled",
};

export async function signInAction() {
  return disabledState;
}

export async function signUpAction() {
  return disabledState;
}

export async function requestMagicLinkAction() {
  return disabledState;
}

export async function requestPasswordResetAction() {
  return disabledState;
}

export async function updatePasswordAction() {
  return disabledState;
}

export async function signInWithGoogleAction() {
  return disabledState;
}

export async function signOutAction() {
  return disabledState;
}
