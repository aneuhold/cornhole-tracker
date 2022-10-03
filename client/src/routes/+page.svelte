<script lang="ts">
  import { user } from 'src/stores/user';

  user.subscribe((updatedUser) => {
    if (!updatedUser.userName) {
      window.location.href = '/login';
    }
  });
</script>
