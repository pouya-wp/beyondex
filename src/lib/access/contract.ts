/** Live purchases must stay unavailable until persistent orders, verified user
 * sessions and subscription provisioning are implemented together. */
export const accessReadiness={ready:false,code:'ACCESS_INTEGRATION_PENDING',reason:'Account authentication, persistent orders and subscription provisioning are not connected.'} as const;
export interface AgentEntitlement {id:string;userId:string;agentSlug:string;status:'pending'|'active'|'expired'|'revoked';expiresAt:string;externalAccountId:string|null}
export interface SubscriptionAdapter {
 provision(input:{orderId:string;userId:string;agentSlug:string;idempotencyKey:string}):Promise<AgentEntitlement>;
 getAccess(input:{userId:string;agentSlug:string}):Promise<AgentEntitlement|null>;
 createLaunchSession(input:{userId:string;entitlementId:string}):Promise<{url:string;expiresAt:string}>;
}
