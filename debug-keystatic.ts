import { reader } from './src/lib/keystatic';

async function debug() {
    const slug = 'nikli-2021';
    const post = await reader.collections.blog.read(slug);
    if (!post) {
        console.log('Post not found');
        return;
    }
    const { content } = post;
    const contentData = await content();
    console.log('Content Data Type:', typeof contentData);
    console.log('Is Array:', Array.isArray(contentData));
    const node = (contentData as any)?.node;
    console.log('Has Node:', !!node);
    console.log('Node Type:', node?.type);
    console.log('Node Children Count:', node?.children?.length);
    console.log('Node Children Sample:', JSON.stringify(node?.children?.[0]).substring(0, 200));
}

debug().catch(console.error);
