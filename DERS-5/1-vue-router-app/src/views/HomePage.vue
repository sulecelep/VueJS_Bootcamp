<template>
  <div class="card border p-2">
    <div class="d-flex justify-content-end">
      <button class="btn btn-sm btn-primary mb-3" @click="$router.push({ name: 'NewBookmark' })">+ Yeni Ekle</button>
    </div>
    <table class="table table-ligth table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Başlık</th>
          <th scope="col">URL</th>
          <th scope="col">Açıklama</th>
          <th scope="col">Sil</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in bookmarkList" :key="item">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.title }}</td>
          <td>
            <a :href="item.url" target="_blank">{{ item.url }}</a>
          </td>
          <td>{{ item.description }}</td>
          <td><button class="btn-sm btn btn-danger" @click="deleteBookmark(item)">Sil</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookmarkList: [],
    };
  },
  created() {
    this.$appAxios.get("/bookmarks").then((bookmark_list_response) => {
      this.bookmarkList = bookmark_list_response.data || [];
      console.log("bookmark_list_response", bookmark_list_response);
    });
  },
  methods: {
    deleteBookmark(item) {
        //console.log('delete_item', item);
        this.$appAxios.delete(`/bookmarks/${item.id}`).then(delete_response =>{
            console.log( delete_response);
            if(delete_response.status ===200){
                this.bookmarkList = this.bookmarkList.filter(b=>b.id != item.id);
            }
        });
    },
  },
};
</script>
