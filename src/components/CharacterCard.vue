<script lang="ts" setup>
import { defaultAvatar } from '~/utils'
</script>

<template>
  <div bg="$h5-c-card-bg">
    <div aspect="1">
      <img
        :src="defaultAvatar"
        alt="asd"
      >
    </div>
    <div p="2">
      <div text="center" text-xl font="bold">
        最爱
      </div>
      <div text="center" text-sm opacity-75>
        asd
      </div>
    </div>
  </div>
</template>
