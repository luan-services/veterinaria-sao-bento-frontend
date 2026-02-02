import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000", /* fallback points to localhost */
    plugins: [ 
        inferAdditionalFields({ /* this plugin let typescript know we added custom fields to user table */
            user: {
                lastName: {
                    type: "string",
                    required: true, 
                    input: true,    
                    returned: false
                },
                role: {
                    type: "string",
                    required: false,
                    defaultValue: "USER", 
                    input: false,
                },
                phone: {
                    type: "string",
                    required: false,
                    input: true,
                    returned: false
                },
                address: {
                    type: "string",
                    required: false,
                    input: true,
                    returned: false
                },
                cpf: {
                    type: "string",
                    required: false,
                    input: true,
                    returned: false
                }
            },
        }),
    ],
})

export const { signIn, signUp, useSession, signOut, updateUser, sendVerificationEmail } = authClient;