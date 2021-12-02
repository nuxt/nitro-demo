<template>
  <div v-if="!isLoading">
        <TopHeader/>
     <section class="section">
      <div class="container">
         <div v-for="sp in project.subProjects" :key="sp.id">
          <p class="title is-size-4"> {{sp.name}}</p>
          <div class="list-container">
               <StandardItem v-for="item in sp.items" :key="item.id" :item="item" />
          </div>
       
           
         </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  head() {
    return {
      title: `${this.project.name} | Plan8`,
    };
  },
  data(){
      return {
          // project: {
          //     name: ''
          // },
      }
  },
  computed: {
    ...mapState(['isLoading', 'project'])
  },
  mounted(){
    console.log(this.project);

    

    

          this.$store.commit('player/SET_SHOWFOOTER', true)
  },


  
  async asyncData({ route, store, app }) {


    try {
      const { id } = route.params;
      console.log("id: ", id);

      const apiRoot = process.env.NODE_ENV == 'production' ? 'https://hqapi.plan8.co/v1' : 'http://localhost:3000/v1';

      let projectId;

      if (id) {
        projectId = id;
      } else {
        projectId = "619b7749fc984a00176ee238";
      }
      const projectPath = `${apiRoot}/projects/${projectId}/public`;
      const project = await $fetch(projectPath);

      // const project = store.dispatch('getPublicProject', {
      //   projectId: id
      // })

      store.commit('SET_ISLOADING', false)

      store.commit('SET_PROJECT', project)




      
      // return {
      //   project,
      // };
    } catch (error) {
      console.log("error!: ", error);

      return {
        // project: {
        //   name: 'Not Found'
        // }
      }
    }

  },
};
</script>
