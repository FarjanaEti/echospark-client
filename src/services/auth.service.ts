"use server";
import { authClient } from "@/lib/auth-client";

export const signUp = async (data: {
                              name: string;
                              email: string;
                              password: string;
}) => {
                              return authClient.signUp.email({
                                                            name: data.name,
                                                            email: data.email,
                                                            password: data.password,
                              });
};

export const signIn = async (data: {
                              email: string;
                              password: string;
}) => {
                              return authClient.signIn.email({
                                                            email: data.email,
                                                            password: data.password,
                              });
};

export const signOut = async () => {
                              return authClient.signOut();
};