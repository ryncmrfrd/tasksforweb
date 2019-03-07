async function auth(){
    await googleTasksApi.authorize('248150601049-fbibbrvjeqojdj45csgilhmj2vk7240e.apps.googleusercontent.com');
}
auth();