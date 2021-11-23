<template>
  <div>
    <section class="section">
      <div class="container">
         <div class="is-size-3 title">{{project.name}}</div>
      </div>
    </section>
     <section class="section">
      <div class="container">
         <div v-for="sp in project.subProjects" :key="sp.id">
          <p class="title is-size-4"> {{sp.name}}</p>
          <div class="button-container">
               <SoundButton v-for="item in sp.items" :key="item.id" :item="item" />
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
      title: `hello ${this.project.name}`,
    };
  },
  data(){
      return {
          project: {
              name: ''
          }
      }
  },
  mounted(){
    console.log(this.project);
  },
  
  async asyncData({ route }) {
    try {
      const { id } = route.params;
      console.log("id: ", id);

      let projectId;

      if (id) {
        projectId = id;
      } else {
        projectId = "619b7749fc984a00176ee238";
      }
      const projectPath = `https://api.plan8.co/v1/projects/${projectId}/public`;
      const project = await $fetch(projectPath);
      return {
        project,
      };
    } catch (error) {
      console.log("error: ", error);
    }

  },
};
</script>
