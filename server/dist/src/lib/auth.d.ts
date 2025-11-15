import { PrismaClient } from "@prisma/client";
declare global {
    var prisma: PrismaClient | undefined;
}
export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth/adapters/prisma").DBAdapter<import("better-auth").BetterAuthOptions>;
    trustedOrigins: string[];
    plugins: [{
        id: "two-factor";
        endpoints: {
            enableTwoFactor: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        password: string;
                        issuer?: string | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        totpURI: string;
                        backupCodes: string[];
                    };
                } : {
                    totpURI: string;
                    backupCodes: string[];
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        password: import("better-auth").ZodString;
                        issuer: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    totpURI: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    backupCodes: {
                                                        type: string;
                                                        items: {
                                                            type: string;
                                                        };
                                                        description: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/enable";
            };
            disableTwoFactor: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        password: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        status: boolean;
                    };
                } : {
                    status: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        password: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    status: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/disable";
            };
            verifyBackupCode: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        code: string;
                        disableSession?: boolean | undefined;
                        trustDevice?: boolean | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        token: string | undefined;
                        user: {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image: string | null | undefined;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                    };
                } : {
                    token: string | undefined;
                    user: {
                        id: string;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image: string | null | undefined;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        code: import("better-auth").ZodString;
                        disableSession: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                        trustDevice: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    user: {
                                                        type: string;
                                                        properties: {
                                                            id: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            email: {
                                                                type: string;
                                                                format: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            emailVerified: {
                                                                type: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            name: {
                                                                type: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            image: {
                                                                type: string;
                                                                format: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            twoFactorEnabled: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            createdAt: {
                                                                type: string;
                                                                format: string;
                                                                description: string;
                                                            };
                                                            updatedAt: {
                                                                type: string;
                                                                format: string;
                                                                description: string;
                                                            };
                                                        };
                                                        required: string[];
                                                        description: string;
                                                    };
                                                    session: {
                                                        type: string;
                                                        properties: {
                                                            token: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            userId: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            createdAt: {
                                                                type: string;
                                                                format: string;
                                                                description: string;
                                                            };
                                                            expiresAt: {
                                                                type: string;
                                                                format: string;
                                                                description: string;
                                                            };
                                                        };
                                                        required: string[];
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/verify-backup-code";
            };
            generateBackupCodes: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        password: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        status: boolean;
                        backupCodes: string[];
                    };
                } : {
                    status: boolean;
                    backupCodes: string[];
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        password: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    status: {
                                                        type: string;
                                                        description: string;
                                                        enum: boolean[];
                                                    };
                                                    backupCodes: {
                                                        type: string;
                                                        items: {
                                                            type: string;
                                                        };
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/generate-backup-codes";
            };
            viewBackupCodes: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: unknown;
                    };
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        status: boolean;
                        backupCodes: string[];
                    };
                } : {
                    status: boolean;
                    backupCodes: string[];
                }>;
                options: {
                    method: "GET";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        SERVER_ONLY: true;
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/view-backup-codes";
            };
            sendTwoFactorOTP: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                    body?: {
                        trustDevice?: boolean | undefined;
                    } | undefined;
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        status: boolean;
                    };
                } : {
                    status: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                        trustDevice: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    }, import("better-auth").$strip>>;
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    status: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/send-otp";
            };
            verifyTwoFactorOTP: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        code: string;
                        trustDevice?: boolean | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        token: string;
                        user: {
                            id: any;
                            email: any;
                            emailVerified: any;
                            name: any;
                            image: any;
                            createdAt: any;
                            updatedAt: any;
                        };
                    };
                } : {
                    token: string;
                    user: {
                        id: any;
                        email: any;
                        emailVerified: any;
                        name: any;
                        image: any;
                        createdAt: any;
                        updatedAt: any;
                    };
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        code: import("better-auth").ZodString;
                        trustDevice: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    token: {
                                                        type: string;
                                                        description: string;
                                                    };
                                                    user: {
                                                        type: string;
                                                        properties: {
                                                            id: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            email: {
                                                                type: string;
                                                                format: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            emailVerified: {
                                                                type: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            name: {
                                                                type: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            image: {
                                                                type: string;
                                                                format: string;
                                                                nullable: boolean;
                                                                description: string;
                                                            };
                                                            createdAt: {
                                                                type: string;
                                                                format: string;
                                                                description: string;
                                                            };
                                                            updatedAt: {
                                                                type: string;
                                                                format: string;
                                                                description: string;
                                                            };
                                                        };
                                                        required: string[];
                                                        description: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/verify-otp";
            };
            generateTOTP: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        secret: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        code: string;
                    };
                } : {
                    code: string;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        secret: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    code: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        SERVER_ONLY: true;
                    };
                } & {
                    use: any[];
                };
                path: "/totp/generate";
            };
            getTOTPURI: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        password: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        totpURI: string;
                    };
                } : {
                    totpURI: string;
                }>;
                options: {
                    method: "POST";
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>)[];
                    body: import("better-auth").ZodObject<{
                        password: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    totpURI: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/get-totp-uri";
            };
            verifyTOTP: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        code: string;
                        trustDevice?: boolean | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        token: string;
                        user: {
                            id: string;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image: string | null | undefined;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                    };
                } : {
                    token: string;
                    user: {
                        id: string;
                        email: string;
                        emailVerified: boolean;
                        name: string;
                        image: string | null | undefined;
                        createdAt: Date;
                        updatedAt: Date;
                    };
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        code: import("better-auth").ZodString;
                        trustDevice: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            summary: string;
                            description: string;
                            responses: {
                                200: {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    status: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/two-factor/verify-totp";
            };
        };
        options: import("better-auth/plugins").TwoFactorOptions | undefined;
        hooks: {
            after: {
                matcher(context: import("better-auth").EndpointContext<string, any> & Omit<import("better-auth").InputContext<string, any>, "method"> & {
                    context: import("better-auth").AuthContext & {
                        returned?: unknown;
                        responseHeaders?: Headers;
                    };
                    headers?: Headers;
                }): boolean;
                handler: (inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                    twoFactorRedirect: boolean;
                } | undefined>;
            }[];
        };
        schema: {
            user: {
                fields: {
                    twoFactorEnabled: {
                        type: "boolean";
                        required: false;
                        defaultValue: false;
                        input: false;
                    };
                };
            };
            twoFactor: {
                fields: {
                    secret: {
                        type: "string";
                        required: true;
                        returned: false;
                    };
                    backupCodes: {
                        type: "string";
                        required: true;
                        returned: false;
                    };
                    userId: {
                        type: "string";
                        required: true;
                        returned: false;
                        references: {
                            model: string;
                            field: string;
                        };
                    };
                };
            };
        };
        rateLimit: {
            pathMatcher(path: string): boolean;
            window: number;
            max: number;
        }[];
        $ERROR_CODES: {
            readonly OTP_NOT_ENABLED: "OTP not enabled";
            readonly OTP_HAS_EXPIRED: "OTP has expired";
            readonly TOTP_NOT_ENABLED: "TOTP not enabled";
            readonly TWO_FACTOR_NOT_ENABLED: "Two factor isn't enabled";
            readonly BACKUP_CODES_NOT_ENABLED: "Backup codes aren't enabled";
            readonly INVALID_BACKUP_CODE: "Invalid backup code";
            readonly INVALID_CODE: "Invalid code";
            readonly TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: "Too many attempts. Please request a new code.";
            readonly INVALID_TWO_FACTOR_COOKIE: "Invalid two factor cookie";
        };
    }, {
        id: "organization";
        endpoints: {
            createOrganization: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        name: string;
                        slug: string;
                        userId?: string | undefined;
                        logo?: string | undefined;
                        metadata?: Record<string, any> | undefined;
                        keepCurrentActiveOrganization?: boolean | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: ({
                        id: string;
                        name: string;
                        slug: string;
                        createdAt: Date;
                        logo?: string | null | undefined | undefined;
                        metadata?: any;
                    } & {
                        metadata: any;
                        members: ({
                            id: string;
                            organizationId: string;
                            userId: string;
                            role: string;
                            createdAt: Date;
                        } | undefined)[];
                    }) | null;
                } : ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined | undefined;
                    metadata?: any;
                } & {
                    metadata: any;
                    members: ({
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    } | undefined)[];
                }) | null>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        name: import("better-auth").ZodString;
                        slug: import("better-auth").ZodString;
                        userId: import("better-auth").ZodOptional<import("better-auth").ZodCoercedString<unknown>>;
                        logo: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        metadata: import("better-auth").ZodOptional<import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>>;
                        keepCurrentActiveOrganization: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>)[];
                    metadata: {
                        $Infer: {
                            body: {
                                name: string;
                                slug: string;
                                userId?: string | undefined;
                                logo?: string | undefined;
                                metadata?: Record<string, any> | undefined;
                                keepCurrentActiveOrganization?: boolean | undefined;
                            };
                        };
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                description: string;
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/create";
            };
            updateOrganization: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        data: {
                            name?: string;
                            slug?: string;
                            logo?: string;
                            metadata?: Record<string, any>;
                        } & Partial<{}>;
                        organizationId?: string | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: ({
                        id: string;
                        name: string;
                        slug: string;
                        createdAt: Date;
                        logo?: string | null | undefined | undefined;
                        metadata?: any;
                    } & {
                        metadata: Record<string, any> | undefined;
                    }) | null;
                } : ({
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined | undefined;
                    metadata?: any;
                } & {
                    metadata: Record<string, any> | undefined;
                }) | null>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        data: import("better-auth").ZodObject<{
                            name: import("better-auth").ZodOptional<import("better-auth").ZodOptional<import("better-auth").ZodString>>;
                            slug: import("better-auth").ZodOptional<import("better-auth").ZodOptional<import("better-auth").ZodString>>;
                            logo: import("better-auth").ZodOptional<import("better-auth").ZodOptional<import("better-auth").ZodString>>;
                            metadata: import("better-auth").ZodOptional<import("better-auth").ZodOptional<import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodAny>>>;
                        }, import("better-auth").$strip>;
                        organizationId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>;
                    requireHeaders: true;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>)[];
                    metadata: {
                        $Infer: {
                            body: {
                                data: {
                                    name?: string;
                                    slug?: string;
                                    logo?: string;
                                    metadata?: Record<string, any>;
                                } & Partial<{}>;
                                organizationId?: string | undefined;
                            };
                        };
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                description: string;
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/update";
            };
            deleteOrganization: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        organizationId: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        id: string;
                        name: string;
                        slug: string;
                        createdAt: Date;
                        logo?: string | null | undefined | undefined;
                        metadata?: any;
                    } | null;
                } : {
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined | undefined;
                    metadata?: any;
                } | null>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        organizationId: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    requireHeaders: true;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>)[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "string";
                                                description: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/delete";
            };
            setActiveOrganization: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        organizationId?: string | null | undefined;
                        organizationSlug?: string | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: ({
                        members: {
                            id: string;
                            organizationId: string;
                            role: "member" | "admin" | "owner";
                            createdAt: Date;
                            userId: string;
                            user: {
                                email: string;
                                name: string;
                                image?: string;
                            };
                        }[];
                        invitations: {
                            id: string;
                            organizationId: string;
                            email: string;
                            role: "member" | "admin" | "owner";
                            status: import("better-auth/plugins").InvitationStatus;
                            inviterId: string;
                            expiresAt: Date;
                        }[];
                    } & {
                        id: string;
                        name: string;
                        slug: string;
                        createdAt: Date;
                        logo?: string | null | undefined | undefined;
                        metadata?: any;
                    }) | null;
                } : ({
                    members: {
                        id: string;
                        organizationId: string;
                        role: "member" | "admin" | "owner";
                        createdAt: Date;
                        userId: string;
                        user: {
                            email: string;
                            name: string;
                            image?: string;
                        };
                    }[];
                    invitations: {
                        id: string;
                        organizationId: string;
                        email: string;
                        role: "member" | "admin" | "owner";
                        status: import("better-auth/plugins").InvitationStatus;
                        inviterId: string;
                        expiresAt: Date;
                    }[];
                } & {
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined | undefined;
                    metadata?: any;
                }) | null>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        organizationId: import("better-auth").ZodOptional<import("better-auth").ZodNullable<import("better-auth").ZodString>>;
                        organizationSlug: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>;
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<{
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                session: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                };
                                user: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            };
                        }>)[];
                    }>) => Promise<{
                        session: {
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        };
                    }>))[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                description: string;
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/set-active";
            };
            getFullOrganization: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: {
                        organizationId?: string | undefined;
                        organizationSlug?: string | undefined;
                        membersLimit?: string | number | undefined;
                    } | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: ({
                        members: {
                            id: string;
                            organizationId: string;
                            role: "member" | "admin" | "owner";
                            createdAt: Date;
                            userId: string;
                            user: {
                                email: string;
                                name: string;
                                image?: string;
                            };
                        }[];
                        invitations: {
                            id: string;
                            organizationId: string;
                            email: string;
                            role: "member" | "admin" | "owner";
                            status: import("better-auth/plugins").InvitationStatus;
                            inviterId: string;
                            expiresAt: Date;
                        }[];
                    } & {
                        id: string;
                        name: string;
                        slug: string;
                        createdAt: Date;
                        logo?: string | null | undefined | undefined;
                        metadata?: any;
                    }) | null;
                } : ({
                    members: {
                        id: string;
                        organizationId: string;
                        role: "member" | "admin" | "owner";
                        createdAt: Date;
                        userId: string;
                        user: {
                            email: string;
                            name: string;
                            image?: string;
                        };
                    }[];
                    invitations: {
                        id: string;
                        organizationId: string;
                        email: string;
                        role: "member" | "admin" | "owner";
                        status: import("better-auth/plugins").InvitationStatus;
                        inviterId: string;
                        expiresAt: Date;
                    }[];
                } & {
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined | undefined;
                    metadata?: any;
                }) | null>;
                options: {
                    method: "GET";
                    query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                        organizationId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        organizationSlug: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        membersLimit: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodNumber, import("better-auth").ZodPipe<import("better-auth").ZodString, import("better-auth").ZodTransform<number, string>>]>>;
                    }, import("better-auth").$strip>>;
                    requireHeaders: true;
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<{
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                session: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                };
                                user: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            };
                        }>)[];
                    }>) => Promise<{
                        session: {
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        };
                    }>))[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                description: string;
                                                $ref: string;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/get-full-organization";
            };
            listOrganizations: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        id: string;
                        name: string;
                        slug: string;
                        createdAt: Date;
                        logo?: string | null | undefined | undefined;
                        metadata?: any;
                    }[];
                } : {
                    id: string;
                    name: string;
                    slug: string;
                    createdAt: Date;
                    logo?: string | null | undefined | undefined;
                    metadata?: any;
                }[]>;
                options: {
                    method: "GET";
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<{
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                session: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                };
                                user: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            };
                        }>)[];
                    }>) => Promise<{
                        session: {
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        };
                    }>))[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "array";
                                                items: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/list";
            };
            createInvitation: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        email: string;
                        role: "member" | "admin" | "owner" | ("member" | "admin" | "owner")[];
                        organizationId?: string | undefined;
                        resend?: boolean;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        expiresAt: Date;
                        id?: string | undefined;
                        organizationId?: string | undefined;
                        email?: string | undefined;
                        role?: "member" | "admin" | "owner" | undefined;
                        status?: import("better-auth/plugins").InvitationStatus | undefined;
                        inviterId?: string | undefined;
                    };
                } : {
                    expiresAt: Date;
                    id?: string | undefined;
                    organizationId?: string | undefined;
                    email?: string | undefined;
                    role?: "member" | "admin" | "owner" | undefined;
                    status?: import("better-auth/plugins").InvitationStatus | undefined;
                    inviterId?: string | undefined;
                }>;
                options: {
                    method: "POST";
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<{
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                session: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                };
                                user: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            };
                        }>)[];
                    }>) => Promise<{
                        session: {
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        };
                    }>))[];
                    body: import("better-auth").ZodObject<{
                        email: import("better-auth").ZodString;
                        role: import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>;
                        organizationId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        resend: import("better-auth").ZodOptional<import("better-auth").ZodBoolean>;
                        teamId: import("better-auth").ZodUnion<readonly [import("better-auth").ZodOptional<import("better-auth").ZodString>, import("better-auth").ZodOptional<import("better-auth").ZodArray<import("better-auth").ZodString>>]>;
                    }, import("better-auth").$strip>;
                    metadata: {
                        $Infer: {
                            body: {
                                email: string;
                                role: "member" | "admin" | "owner" | ("member" | "admin" | "owner")[];
                                organizationId?: string | undefined;
                                resend?: boolean;
                            };
                        };
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    id: {
                                                        type: string;
                                                    };
                                                    email: {
                                                        type: string;
                                                    };
                                                    role: {
                                                        type: string;
                                                    };
                                                    organizationId: {
                                                        type: string;
                                                    };
                                                    inviterId: {
                                                        type: string;
                                                    };
                                                    status: {
                                                        type: string;
                                                    };
                                                    expiresAt: {
                                                        type: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/invite-member";
            };
            cancelInvitation: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        invitationId: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        id: string;
                        organizationId: string;
                        email: string;
                        role: "member" | "admin" | "owner";
                        status: import("better-auth/plugins").InvitationStatus;
                        inviterId: string;
                        expiresAt: Date;
                    } | null;
                } : {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: "member" | "admin" | "owner";
                    status: import("better-auth/plugins").InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                } | null>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        invitationId: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<{
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                session: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                };
                                user: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            };
                        }>)[];
                    }>) => Promise<{
                        session: {
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        };
                    }>))[];
                    openapi: {
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: string;
                                            properties: {
                                                invitation: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/cancel-invitation";
            };
            acceptInvitation: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        invitationId: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        invitation: {
                            id: string;
                            organizationId: string;
                            email: string;
                            role: "member" | "admin" | "owner";
                            status: import("better-auth/plugins").InvitationStatus;
                            inviterId: string;
                            expiresAt: Date;
                        };
                        member: {
                            id: string;
                            organizationId: string;
                            userId: string;
                            role: string;
                            createdAt: Date;
                        };
                    } | null;
                } : {
                    invitation: {
                        id: string;
                        organizationId: string;
                        email: string;
                        role: "member" | "admin" | "owner";
                        status: import("better-auth/plugins").InvitationStatus;
                        inviterId: string;
                        expiresAt: Date;
                    };
                    member: {
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    };
                } | null>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        invitationId: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<{
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                session: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                };
                                user: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            };
                        }>)[];
                    }>) => Promise<{
                        session: {
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        };
                    }>))[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    invitation: {
                                                        type: string;
                                                    };
                                                    member: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/accept-invitation";
            };
            getInvitation: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query: {
                        id: string;
                    };
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        id: string;
                        organizationId: string;
                        email: string;
                        role: "member" | "admin" | "owner";
                        status: import("better-auth/plugins").InvitationStatus;
                        inviterId: string;
                        expiresAt: Date;
                    } & {
                        organizationName: string;
                        organizationSlug: string;
                        inviterEmail: string;
                    };
                } : {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: "member" | "admin" | "owner";
                    status: import("better-auth/plugins").InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                } & {
                    organizationName: string;
                    organizationSlug: string;
                    inviterEmail: string;
                }>;
                options: {
                    method: "GET";
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>)[];
                    requireHeaders: true;
                    query: import("better-auth").ZodObject<{
                        id: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    id: {
                                                        type: string;
                                                    };
                                                    email: {
                                                        type: string;
                                                    };
                                                    role: {
                                                        type: string;
                                                    };
                                                    organizationId: {
                                                        type: string;
                                                    };
                                                    inviterId: {
                                                        type: string;
                                                    };
                                                    status: {
                                                        type: string;
                                                    };
                                                    expiresAt: {
                                                        type: string;
                                                    };
                                                    organizationName: {
                                                        type: string;
                                                    };
                                                    organizationSlug: {
                                                        type: string;
                                                    };
                                                    inviterEmail: {
                                                        type: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/get-invitation";
            };
            rejectInvitation: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        invitationId: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        invitation: {
                            id: string;
                            organizationId: string;
                            email: string;
                            role: "member" | "admin" | "owner";
                            status: import("better-auth/plugins").InvitationStatus;
                            inviterId: string;
                            expiresAt: Date;
                        } | null;
                        member: null;
                    };
                } : {
                    invitation: {
                        id: string;
                        organizationId: string;
                        email: string;
                        role: "member" | "admin" | "owner";
                        status: import("better-auth/plugins").InvitationStatus;
                        inviterId: string;
                        expiresAt: Date;
                    } | null;
                    member: null;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        invitationId: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<{
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                session: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                };
                                user: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            };
                        }>)[];
                    }>) => Promise<{
                        session: {
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        };
                    }>))[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    invitation: {
                                                        type: string;
                                                    };
                                                    member: {
                                                        type: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/reject-invitation";
            };
            listInvitations: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: {
                        organizationId?: string | undefined;
                    } | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        id: string;
                        organizationId: string;
                        email: string;
                        role: "member" | "admin" | "owner";
                        status: import("better-auth/plugins").InvitationStatus;
                        inviterId: string;
                        expiresAt: Date;
                    }[];
                } : {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: "member" | "admin" | "owner";
                    status: import("better-auth/plugins").InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                }[]>;
                options: {
                    method: "GET";
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<{
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                session: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                };
                                user: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            };
                        }>)[];
                    }>) => Promise<{
                        session: {
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        };
                    }>))[];
                    query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                        organizationId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>>;
                } & {
                    use: any[];
                };
                path: "/organization/list-invitations";
            };
            getActiveMember: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        user: {
                            id: string;
                            name: string;
                            email: string;
                            image: string | null | undefined;
                        };
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    } | null;
                } : {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | null | undefined;
                    };
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } | null>;
                options: {
                    method: "GET";
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<{
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                session: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                };
                                user: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            };
                        }>)[];
                    }>) => Promise<{
                        session: {
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        };
                    }>))[];
                    requireHeaders: true;
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    id: {
                                                        type: string;
                                                    };
                                                    userId: {
                                                        type: string;
                                                    };
                                                    organizationId: {
                                                        type: string;
                                                    };
                                                    role: {
                                                        type: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/get-active-member";
            };
            checkOrganizationSlug: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        slug: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        status: boolean;
                    };
                } : {
                    status: boolean;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        slug: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        } | null;
                    }>))[];
                } & {
                    use: any[];
                };
                path: "/organization/check-slug";
            };
            addMember: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        userId: string;
                        role: "member" | "admin" | "owner" | ("member" | "admin" | "owner")[];
                        organizationId?: string | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    } | null;
                } : {
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                } | null>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodCoercedString<unknown>;
                        role: import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>;
                        organizationId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        teamId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>)[];
                    metadata: {
                        SERVER_ONLY: true;
                        $Infer: {
                            body: {
                                userId: string;
                                role: "member" | "admin" | "owner" | ("member" | "admin" | "owner")[];
                                organizationId?: string | undefined;
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/add-member";
            };
            removeMember: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        memberIdOrEmail: string;
                        organizationId?: string | undefined;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        member: {
                            id: string;
                            organizationId: string;
                            userId: string;
                            role: string;
                            createdAt: Date;
                        };
                    } | null;
                } : {
                    member: {
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    };
                } | null>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        memberIdOrEmail: import("better-auth").ZodString;
                        organizationId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>;
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<{
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                session: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                };
                                user: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            };
                        }>)[];
                    }>) => Promise<{
                        session: {
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        };
                    }>))[];
                    metadata: {
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    member: {
                                                        type: string;
                                                        properties: {
                                                            id: {
                                                                type: string;
                                                            };
                                                            userId: {
                                                                type: string;
                                                            };
                                                            organizationId: {
                                                                type: string;
                                                            };
                                                            role: {
                                                                type: string;
                                                            };
                                                        };
                                                        required: string[];
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/remove-member";
            };
            updateMemberRole: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        role: "member" | import("better-auth").LiteralString | "admin" | "owner" | ("member" | "admin" | "owner")[] | import("better-auth").LiteralString[];
                        memberId: string;
                        organizationId?: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        id: string;
                        organizationId: string;
                        role: "member" | "admin" | "owner";
                        createdAt: Date;
                        userId: string;
                        user: {
                            email: string;
                            name: string;
                            image?: string;
                        };
                    };
                } : {
                    id: string;
                    organizationId: string;
                    role: "member" | "admin" | "owner";
                    createdAt: Date;
                    userId: string;
                    user: {
                        email: string;
                        name: string;
                        image?: string;
                    };
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        role: import("better-auth").ZodUnion<readonly [import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>]>;
                        memberId: import("better-auth").ZodString;
                        organizationId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>;
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<{
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                session: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                };
                                user: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            };
                        }>)[];
                    }>) => Promise<{
                        session: {
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        };
                    }>))[];
                    metadata: {
                        $Infer: {
                            body: {
                                role: "member" | import("better-auth").LiteralString | "admin" | "owner" | ("member" | "admin" | "owner")[] | import("better-auth").LiteralString[];
                                memberId: string;
                                organizationId?: string;
                            };
                        };
                        openapi: {
                            description: string;
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    member: {
                                                        type: string;
                                                        properties: {
                                                            id: {
                                                                type: string;
                                                            };
                                                            userId: {
                                                                type: string;
                                                            };
                                                            organizationId: {
                                                                type: string;
                                                            };
                                                            role: {
                                                                type: string;
                                                            };
                                                        };
                                                        required: string[];
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/update-member-role";
            };
            leaveOrganization: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: {
                        organizationId: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        user: {
                            id: string;
                            name: string;
                            email: string;
                            image: string | null | undefined;
                        };
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    };
                } : {
                    user: {
                        id: string;
                        name: string;
                        email: string;
                        image: string | null | undefined;
                    };
                    id: string;
                    organizationId: string;
                    userId: string;
                    role: string;
                    createdAt: Date;
                }>;
                options: {
                    method: "POST";
                    body: import("better-auth").ZodObject<{
                        organizationId: import("better-auth").ZodString;
                    }, import("better-auth").$strip>;
                    requireHeaders: true;
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        session: {
                            session: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            };
                            user: Record<string, any> & {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            };
                        };
                    }>))[];
                } & {
                    use: any[];
                };
                path: "/organization/leave";
            };
            listUserInvitations: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: {
                        email?: string | undefined;
                    } | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        id: string;
                        organizationId: string;
                        email: string;
                        role: "member" | "admin" | "owner";
                        status: import("better-auth/plugins").InvitationStatus;
                        inviterId: string;
                        expiresAt: Date;
                    }[];
                } : {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: "member" | "admin" | "owner";
                    status: import("better-auth/plugins").InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                }[]>;
                options: {
                    method: "GET";
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>)[];
                    query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                        email: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>>;
                } & {
                    use: any[];
                };
                path: "/organization/list-user-invitations";
            };
            listMembers: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: {
                        limit?: string | number | undefined;
                        offset?: string | number | undefined;
                        sortBy?: string | undefined;
                        sortDirection?: "asc" | "desc" | undefined;
                        filterField?: string | undefined;
                        filterValue?: string | number | boolean | undefined;
                        filterOperator?: "eq" | "ne" | "lt" | "lte" | "gt" | "gte" | "contains" | undefined;
                        organizationId?: string | undefined;
                    } | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        members: {
                            user: {
                                id: string;
                                name: string;
                                email: string;
                                image: string | null | undefined;
                            };
                            id: string;
                            organizationId: string;
                            userId: string;
                            role: string;
                            createdAt: Date;
                        }[];
                        total: number;
                    };
                } : {
                    members: {
                        user: {
                            id: string;
                            name: string;
                            email: string;
                            image: string | null | undefined;
                        };
                        id: string;
                        organizationId: string;
                        userId: string;
                        role: string;
                        createdAt: Date;
                    }[];
                    total: number;
                }>;
                options: {
                    method: "GET";
                    query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                        limit: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                        offset: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>>;
                        sortBy: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        sortDirection: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                            asc: "asc";
                            desc: "desc";
                        }>>;
                        filterField: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        filterValue: import("better-auth").ZodOptional<import("better-auth").ZodUnion<[import("better-auth").ZodUnion<[import("better-auth").ZodString, import("better-auth").ZodNumber]>, import("better-auth").ZodBoolean]>>;
                        filterOperator: import("better-auth").ZodOptional<import("better-auth").ZodEnum<{
                            eq: "eq";
                            ne: "ne";
                            lt: "lt";
                            lte: "lte";
                            gt: "gt";
                            gte: "gte";
                            contains: "contains";
                        }>>;
                        organizationId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>>;
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<{
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                session: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                };
                                user: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            };
                        }>)[];
                    }>) => Promise<{
                        session: {
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        };
                    }>))[];
                } & {
                    use: any[];
                };
                path: "/organization/list-members";
            };
            getActiveMemberRole: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0?: ({
                    body?: undefined;
                } & {
                    method?: "GET" | undefined;
                } & {
                    query?: {
                        userId?: string | undefined;
                        organizationId?: string | undefined;
                    } | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers?: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }) | undefined): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        role: string;
                    };
                } : {
                    role: string;
                }>;
                options: {
                    method: "GET";
                    query: import("better-auth").ZodOptional<import("better-auth").ZodObject<{
                        userId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                        organizationId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>>;
                    use: (((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                        orgOptions: import("better-auth/plugins").OrganizationOptions;
                        roles: {
                            admin: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            owner: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                            member: {
                                authorize<K extends "organization" | "member" | "invitation" | "ac" | "team">(request: K extends infer T extends keyof import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }> ? { [key in T]?: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>[key] | {
                                    actions: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                        readonly organization: readonly ["update", "delete"];
                                        readonly member: readonly ["create", "update", "delete"];
                                        readonly invitation: readonly ["create", "cancel"];
                                        readonly team: readonly ["create", "update", "delete"];
                                        readonly ac: readonly ["create", "read", "update", "delete"];
                                    }>[key];
                                    connector: "OR" | "AND";
                                } | undefined; } : never, connector?: "OR" | "AND"): import("better-auth/plugins/access").AuthorizeResponse;
                                statements: import("better-auth/plugins/access").Subset<"organization" | "member" | "invitation" | "ac" | "team", {
                                    readonly organization: readonly ["update", "delete"];
                                    readonly member: readonly ["create", "update", "delete"];
                                    readonly invitation: readonly ["create", "cancel"];
                                    readonly team: readonly ["create", "update", "delete"];
                                    readonly ac: readonly ["create", "read", "update", "delete"];
                                }>;
                            };
                        } & {
                            [key: string]: import("better-auth/plugins/access").Role<{}>;
                        };
                        getSession: (context: import("better-auth").GenericEndpointContext) => Promise<{
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        }>;
                    }>) | ((inputContext: import("better-auth").MiddlewareInputContext<{
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                session: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                };
                                user: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            };
                        }>)[];
                    }>) => Promise<{
                        session: {
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        };
                    }>))[];
                } & {
                    use: any[];
                };
                path: "/organization/get-active-member-role";
            };
        } & {
            hasPermission: {
                <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
                    body: ({
                        permission: {
                            readonly organization?: ("update" | "delete")[] | undefined;
                            readonly member?: ("create" | "update" | "delete")[] | undefined;
                            readonly invitation?: ("create" | "cancel")[] | undefined;
                            readonly team?: ("create" | "update" | "delete")[] | undefined;
                            readonly ac?: ("create" | "update" | "delete" | "read")[] | undefined;
                        };
                        permissions?: never;
                    } | {
                        permissions: {
                            readonly organization?: ("update" | "delete")[] | undefined;
                            readonly member?: ("create" | "update" | "delete")[] | undefined;
                            readonly invitation?: ("create" | "cancel")[] | undefined;
                            readonly team?: ("create" | "update" | "delete")[] | undefined;
                            readonly ac?: ("create" | "update" | "delete" | "read")[] | undefined;
                        };
                        permission?: never;
                    }) & {
                        organizationId?: string;
                    };
                } & {
                    method?: "POST" | undefined;
                } & {
                    query?: Record<string, any> | undefined;
                } & {
                    params?: Record<string, any>;
                } & {
                    request?: Request;
                } & {
                    headers: HeadersInit;
                } & {
                    asResponse?: boolean;
                    returnHeaders?: boolean;
                    use?: import("better-auth").Middleware[];
                    path?: string;
                } & {
                    asResponse?: AsResponse | undefined;
                    returnHeaders?: ReturnHeaders | undefined;
                }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
                    headers: Headers;
                    response: {
                        error: null;
                        success: boolean;
                    };
                } : {
                    error: null;
                    success: boolean;
                }>;
                options: {
                    method: "POST";
                    requireHeaders: true;
                    body: import("better-auth").ZodIntersection<import("better-auth").ZodObject<{
                        organizationId: import("better-auth").ZodOptional<import("better-auth").ZodString>;
                    }, import("better-auth").$strip>, import("better-auth").ZodUnion<readonly [import("better-auth").ZodObject<{
                        permission: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                        permissions: import("better-auth").ZodUndefined;
                    }, import("better-auth").$strip>, import("better-auth").ZodObject<{
                        permission: import("better-auth").ZodUndefined;
                        permissions: import("better-auth").ZodRecord<import("better-auth").ZodString, import("better-auth").ZodArray<import("better-auth").ZodString>>;
                    }, import("better-auth").$strip>]>>;
                    use: ((inputContext: import("better-auth").MiddlewareInputContext<{
                        use: ((inputContext: import("better-auth").MiddlewareInputContext<import("better-auth").MiddlewareOptions>) => Promise<{
                            session: {
                                session: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    userId: string;
                                    expiresAt: Date;
                                    token: string;
                                    ipAddress?: string | null | undefined;
                                    userAgent?: string | null | undefined;
                                };
                                user: Record<string, any> & {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                };
                            };
                        }>)[];
                    }>) => Promise<{
                        session: {
                            session: import("better-auth").Session & {
                                activeTeamId?: string;
                                activeOrganizationId?: string;
                            };
                            user: import("better-auth").User;
                        };
                    }>)[];
                    metadata: {
                        $Infer: {
                            body: ({
                                permission: {
                                    readonly organization?: ("update" | "delete")[] | undefined;
                                    readonly member?: ("create" | "update" | "delete")[] | undefined;
                                    readonly invitation?: ("create" | "cancel")[] | undefined;
                                    readonly team?: ("create" | "update" | "delete")[] | undefined;
                                    readonly ac?: ("create" | "update" | "delete" | "read")[] | undefined;
                                };
                                permissions?: never;
                            } | {
                                permissions: {
                                    readonly organization?: ("update" | "delete")[] | undefined;
                                    readonly member?: ("create" | "update" | "delete")[] | undefined;
                                    readonly invitation?: ("create" | "cancel")[] | undefined;
                                    readonly team?: ("create" | "update" | "delete")[] | undefined;
                                    readonly ac?: ("create" | "update" | "delete" | "read")[] | undefined;
                                };
                                permission?: never;
                            }) & {
                                organizationId?: string;
                            };
                        };
                        openapi: {
                            description: string;
                            requestBody: {
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                permission: {
                                                    type: string;
                                                    description: string;
                                                    deprecated: boolean;
                                                };
                                                permissions: {
                                                    type: string;
                                                    description: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                            responses: {
                                "200": {
                                    description: string;
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object";
                                                properties: {
                                                    error: {
                                                        type: string;
                                                    };
                                                    success: {
                                                        type: string;
                                                    };
                                                };
                                                required: string[];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                } & {
                    use: any[];
                };
                path: "/organization/has-permission";
            };
        };
        schema: {
            session: {
                fields: {
                    activeOrganizationId: {
                        type: "string";
                        required: false;
                    };
                };
            };
        };
        $Infer: {
            Organization: {
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined;
                metadata?: any;
            };
            Invitation: {
                id: string;
                organizationId: string;
                email: string;
                role: "member" | "admin" | "owner";
                status: import("better-auth/plugins").InvitationStatus;
                inviterId: string;
                expiresAt: Date;
            };
            Member: {
                id: string;
                organizationId: string;
                role: "member" | "admin" | "owner";
                createdAt: Date;
                userId: string;
                user: {
                    email: string;
                    name: string;
                    image?: string;
                };
            };
            Team: any;
            TeamMember: any;
            ActiveOrganization: ({
                members: {
                    id: string;
                    organizationId: string;
                    role: "member" | "admin" | "owner";
                    createdAt: Date;
                    userId: string;
                    user: {
                        email: string;
                        name: string;
                        image?: string;
                    };
                }[];
                invitations: {
                    id: string;
                    organizationId: string;
                    email: string;
                    role: "member" | "admin" | "owner";
                    status: import("better-auth/plugins").InvitationStatus;
                    inviterId: string;
                    expiresAt: Date;
                }[];
            } & {
                id: string;
                name: string;
                slug: string;
                createdAt: Date;
                logo?: string | null | undefined | undefined;
                metadata?: any;
            }) | null;
        };
        $ERROR_CODES: {
            readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION: "You are not allowed to create a new organization";
            readonly YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS: "You have reached the maximum number of organizations";
            readonly ORGANIZATION_ALREADY_EXISTS: "Organization already exists";
            readonly ORGANIZATION_NOT_FOUND: "Organization not found";
            readonly USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION: "User is not a member of the organization";
            readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION: "You are not allowed to update this organization";
            readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION: "You are not allowed to delete this organization";
            readonly NO_ACTIVE_ORGANIZATION: "No active organization";
            readonly USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION: "User is already a member of this organization";
            readonly MEMBER_NOT_FOUND: "Member not found";
            readonly ROLE_NOT_FOUND: "Role not found";
            readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM: "You are not allowed to create a new team";
            readonly TEAM_ALREADY_EXISTS: "Team already exists";
            readonly TEAM_NOT_FOUND: "Team not found";
            readonly YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER: "You cannot leave the organization as the only owner";
            readonly YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER: "You cannot leave the organization without an owner";
            readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER: "You are not allowed to delete this member";
            readonly YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION: "You are not allowed to invite users to this organization";
            readonly USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION: "User is already invited to this organization";
            readonly INVITATION_NOT_FOUND: "Invitation not found";
            readonly YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION: "You are not the recipient of the invitation";
            readonly EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION: "Email verification required before accepting or rejecting invitation";
            readonly YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION: "You are not allowed to cancel this invitation";
            readonly INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION: "Inviter is no longer a member of the organization";
            readonly YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE: "You are not allowed to invite a user with this role";
            readonly FAILED_TO_RETRIEVE_INVITATION: "Failed to retrieve invitation";
            readonly YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS: "You have reached the maximum number of teams";
            readonly UNABLE_TO_REMOVE_LAST_TEAM: "Unable to remove last team";
            readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER: "You are not allowed to update this member";
            readonly ORGANIZATION_MEMBERSHIP_LIMIT_REACHED: "Organization membership limit reached";
            readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION: "You are not allowed to create teams in this organization";
            readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION: "You are not allowed to delete teams in this organization";
            readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM: "You are not allowed to update this team";
            readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM: "You are not allowed to delete this team";
            readonly INVITATION_LIMIT_REACHED: "Invitation limit reached";
            readonly TEAM_MEMBER_LIMIT_REACHED: "Team member limit reached";
            readonly USER_IS_NOT_A_MEMBER_OF_THE_TEAM: "User is not a member of the team";
            readonly YOU_CAN_NOT_ACCESS_THE_MEMBERS_OF_THIS_TEAM: "You are not allowed to list the members of this team";
            readonly YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM: "You do not have an active team";
            readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER: "You are not allowed to create a new member";
            readonly YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER: "You are not allowed to remove a team member";
            readonly YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION: "You are not allowed to access this organization as an owner";
            readonly YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION: "You are not a member of this organization";
            readonly MISSING_AC_INSTANCE: "Dynamic Access Control requires a pre-defined ac instance on the server auth plugin. Read server logs for more information";
            readonly YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE: "You must be in an organization to create a role";
            readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE: "You are not allowed to create a role";
            readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE: "You are not allowed to update a role";
            readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE: "You are not allowed to delete a role";
            readonly YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE: "You are not allowed to read a role";
            readonly YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE: "You are not allowed to list a role";
            readonly YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE: "You are not allowed to get a role";
            readonly TOO_MANY_ROLES: "This organization has too many roles";
            readonly INVALID_RESOURCE: "The provided permission includes an invalid resource";
            readonly ROLE_NAME_IS_ALREADY_TAKEN: "That role name is already taken";
            readonly CANNOT_DELETE_A_PRE_DEFINED_ROLE: "Cannot delete a pre-defined role";
        };
        options: import("better-auth/plugins").OrganizationOptions;
    }];
    emailAndPassword: {
        enabled: true;
        requireEmailVerification: true;
    };
    socialProviders: {
        google: {
            prompt: "select_account";
            clientId: string;
            clientSecret: string;
        };
    } | {
        google?: never;
    };
    emailVerification: {
        sendVerificationEmail: ({ user, url }: {
            user: import("better-auth").User;
            url: string;
            token: string;
        }) => Promise<void>;
        autoSignInAfterVerification: true;
        sendOnSignUp: true;
    };
}>;
//# sourceMappingURL=auth.d.ts.map