<script>
import { browser } from '$app/env';

import { goto } from '$app/navigation';

    import {user} from '$lib/store/auth';

    $: if (browser) {
        if(!$user) {
            goto('/admin');
        }
    }

</script>

<h1>Admin Dashboard</h1>
<p>welcome {$user?.email}</p>
