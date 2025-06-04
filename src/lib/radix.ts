// place files you want to import through the `$lib` alias in this folder.

import { GatewayApiClient } from "@radixdlt/babylon-gateway-api-sdk";
import { Logger, RadixDappToolkit } from "@radixdlt/radix-dapp-toolkit";
import { GatewayEzMode } from "@rippy/gateway-ez-mode";

export const rdt = RadixDappToolkit({
  dAppDefinitionAddress:
    "account_rdx12ylpx866rjg950ttl90mqzuhf0007p6yj73z7j4u7exwje5pug2tzu", // Replace with your dApp definition address
  networkId: 1, // Mainnet - 2 for stokenet
  applicationName: "my_app",
  applicationVersion: "1.0.0",
  logger: Logger(1), // provides console logs for wallet interactions/transactions
});

const gatewayApi = GatewayApiClient.initialize(rdt.gatewayApi.clientConfig);

export const ezGateway = new GatewayEzMode(gatewayApi);
