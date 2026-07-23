/* 自毁程序：接管后清空所有缓存、注销自己、强制刷新页面。
   原型迭代期不需要离线缓存——它带来的“更新看不到”比好处大得多。
   等产品定型后再考虑重新引入。 */
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((c) => c.navigate(c.url));
  })());
});
