import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@/consts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
	const posts = await getCollection('blog');
	if (!context.site) {
		return new Response(null, {
			status: 404,
			statusText: 'Not found',
		});
	}
	return rss({
		title: SITE.title,
		description: SITE.description,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			updatedDate: post.data.updatedDate,
			link: `/${post.slug}/`,
		})),
	});
}
