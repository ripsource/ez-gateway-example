<script>
  import "../app.css";
  import { onMount } from "svelte";
  import { rdt } from "$lib/radix";
  import { DataRequestBuilder } from "@radixdlt/radix-dapp-toolkit";
  import { account } from "$lib/stores";
  import ConnectButton from "$lib/ConnectButton.svelte";

  onMount(() => {
    rdt.buttonApi.setTheme("black");
    rdt.walletApi.setRequestData(DataRequestBuilder.accounts().exactly(1));
    rdt.walletApi.walletData$.subscribe((data) => {
      $account = data.accounts[0].address;
    });
  });
</script>

<div class="mt-16">
  <ConnectButton />
</div>
<slot></slot>
