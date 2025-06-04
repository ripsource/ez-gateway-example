<script lang="ts">
  import { ezGateway } from "$lib/radix";
  import { account } from "$lib/stores";
  import type {
    ComponentInfo,
    FungibleResourceBalance,
    NftBalance,
  } from "@rippy/gateway-ez-mode/dist/types";

  // get account info the ez way

  let account_info_print: string;
  let account_default_way_print: string;
  let userName: string;

  async function getAccountInfo() {
    if (!$account) {
      console.error("No account address found");
      return;
    }

    const accountInfo: ComponentInfo =
      await ezGateway.state.getComponentInfo($account);

    const get_user_domain_name =
      await ezGateway.domains.getXrdDomainsForComponent($account);

    if (get_user_domain_name.length > 0) {
      console.log("User domain name found:", get_user_domain_name);
      userName = get_user_domain_name[0];
    } else {
      userName = "No domain name found";
    }

    account_info_print = JSON.stringify(accountInfo, null, 2);

    // // get balances of fungibles in an account or component
    // const fungibleBalances: FungibleResourceBalance[] = await ezGateway.state.getComponentFungibleBalances($account);
    // // get balances of non-fungibles in an account or component
    // const nonFungibleBalances: NftBalance[] = await ezGateway.state.getComponentNonFungibleBalances($account);
    // // get info of multiple components in a single call
    // const multiple_component_info: ComponentInfo[] = await ezGateway.state.getComponentInfoBatch([$account, $account, $account])
  }

  // get info the default way, but still using the ezGateway

  async function getAccountInfoDefaultWay() {
    if (!$account) {
      console.error("No account address found");
      return;
    }

    const accountInfoDefaultWay =
      await ezGateway.gateway.state.innerClient.stateEntityDetails({
        stateEntityDetailsRequest: {
          addresses: [$account],
          opt_ins: {
            non_fungible_include_nfids: true,
            // etc.
          },
        },
      });

    account_default_way_print = JSON.stringify(accountInfoDefaultWay, null, 2);
  }

  // reactive statement to fetch account info when account changes
  $: $account, getAccountInfo(), getAccountInfoDefaultWay();
</script>

<main class="text-center mt-16 md:mx-20">
  <p class="font-bold text-4xl">Account: {$account}</p>
  <p class="text-5xl mt-4">AKA: {userName}</p>
  <p class="font-bold text-4xl mt-10">Account info</p>
  <p class="text-xs mt-4">{account_info_print}</p>
  <p class="font-bold text-4xl mt-10">Account default way:</p>
  <p class="text-xs mt-4">{account_default_way_print}</p>
</main>
