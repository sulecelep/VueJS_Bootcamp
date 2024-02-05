<template>

  <Modal>
    <template #title>
      <h3>Slots ile Gelen Title Bilgisi</h3>
    </template>
    <template #content>
      <p class="text-green">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, rerum.</p>
    </template>
    <template #default>
        Bu default olarak gösterilecek.
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/Modal";

export default {
  data() {
    return {
      content: `<h3 class="text-red">title</h3>`,
    };
  },
  components: {
    Modal,
  },
  methods: {
    onSave() {
      alert("Saved!!");
    },
  },
};
</script>
