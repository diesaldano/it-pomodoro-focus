<template>
  <div>
    <router-view />
    <div class="d-flex justify-content-center floating-toolbar">
        <Toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem; background-color: transparent; box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);">
            <template #start>
                <div class="flex align-items-center gap-2">
                    <Button label="Timer" style="color: white; hover: black;" text plain @click="goTo('/')"/>
                    <Button label="Countdown" style="color: white;" text plain @click="goTo('count')"/>
                    <!-- <Button icon="pi pi-check" text raised rounded aria-label="Filter" style="    border-radius: 50%" 
                    @click="goTo('count')"/> -->
                </div>
            </template>
        </Toolbar>
    </div>
  </div>
</template>




<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const router = useRouter();


    const goTo = (path: string) => {
      router.push(path);
    };

    return {
      goTo,

    };
  },
});
</script>

<style>

.floating-toolbar {
  position: fixed; /* Fija la barra de herramientas sobre el contenido */
  bottom: 20px; /* 20px desde la parte inferior */
  left: calc(50% - 150px); /* Centra la barra de herramientas horizontalmente */
  z-index: 1000; /* Asegúrate de que tenga un alto z-index para flotar sobre otros elementos */
  
  padding: 20px; /* Espacio alrededor del contenido */
  border-radius: 5px;
}

</style>