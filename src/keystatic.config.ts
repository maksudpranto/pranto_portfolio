import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        blog: collection({
            label: 'Blog Posts',
            slugField: 'title',
            path: 'src/content/blog/*',
            format: { data: 'json' },
            schema: {
                title: fields.text({ label: 'Title' }),
                date: fields.date({ label: 'Published Date' }),
                excerpt: fields.text({ label: 'Excerpt', multiline: true }),
                image: fields.image({
                    label: 'Featured Image',
                    directory: 'public/images/blog',
                    publicPath: '/images/blog',
                }),
                content: fields.document({
                    label: 'Content',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: {
                        directory: 'public/images/blog',
                        publicPath: '/images/blog',
                    },
                }),
                tags: fields.array(fields.text({ label: 'Tag' }), {
                    label: 'Tags',
                    itemLabel: (props) => props.value,
                }),
                accentColor: fields.text({ label: 'Accent Color', defaultValue: '#FDC435' }),
            },
        }),
        photos: collection({
            label: 'Photos',
            slugField: 'title',
            path: 'src/content/photos/*',
            format: { data: 'json' },
            schema: {
                title: fields.text({ label: 'Title' }),
                location: fields.text({ label: 'Location' }),
                date: fields.text({ label: 'Date' }),
                category: fields.text({ label: 'Category' }),
                image: fields.image({
                    label: 'Image',
                    directory: 'public/images/photography',
                    publicPath: '/images/photography',
                }),
                aspect: fields.select({
                    label: 'Aspect Ratio',
                    options: [
                        { label: 'Video (16:9)', value: 'aspect-video' },
                        { label: 'Square (1:1)', value: 'aspect-square' },
                        { label: 'Portrait (4:5)', value: 'aspect-[4/5]' },
                        { label: 'Auto', value: 'aspect-auto' },
                    ],
                    defaultValue: 'aspect-video',
                }),
            },
        }),
        experience: collection({
            label: 'Experience',
            slugField: 'company',
            path: 'src/content/experience/*',
            format: { data: 'json' },
            schema: {
                company: fields.text({ label: 'Company' }),
                role: fields.text({ label: 'Role' }),
                period: fields.text({ label: 'Period' }),
                description: fields.text({ label: 'Description', multiline: true }),
                order: fields.integer({ label: 'Order', defaultValue: 0 }),
            },
        }),
        education: collection({
            label: 'Education',
            slugField: 'degree',
            path: 'src/content/education/*',
            format: { data: 'json' },
            schema: {
                institution: fields.text({ label: 'Institution' }),
                degree: fields.text({ label: 'Degree' }),
                period: fields.text({ label: 'Period' }),
                location: fields.text({ label: 'Location' }),
                order: fields.integer({ label: 'Order', defaultValue: 0 }),
            },
        }),
    },
    singletons: {
        profile: singleton({
            label: 'Profile Page',
            path: 'src/content/profile',
            format: { data: 'json' },
            schema: {
                appearance: fields.object({
                    themeColor: fields.conditional(
                        fields.select({
                            label: 'Theme Color Selection Mode',
                            options: [
                                { label: 'Curated Palette', value: 'palette' },
                                { label: 'Custom Hex Code', value: 'custom' },
                            ],
                            defaultValue: 'palette',
                        }),
                        {
                            palette: fields.select({
                                label: 'Choose a Posh Color',
                                options: [
                                    { label: 'Studio Gold (Default)', value: '#FDC435' },
                                    { label: 'Modern Emerald', value: '#10B981' },
                                    { label: 'Royal Indigo', value: '#6366F1' },
                                    { label: 'Elegant Rose', value: '#F43F5E' },
                                    { label: 'Sophisticated Violet', value: '#8B5CF6' },
                                    { label: 'Warm Amber', value: '#F59E0B' },
                                    { label: 'Deep Slate', value: '#475569' },
                                    { label: 'Midnight Blue', value: '#1E293B' },
                                ],
                                defaultValue: '#FDC435',
                            }),
                            custom: fields.text({
                                label: 'Custom Hex Color',
                                defaultValue: '#FDC435',
                                validation: { length: { min: 4, max: 7 } },
                            }),
                        }
                    ),
                }, { label: 'Site Appearance' }),
                sections: fields.object({
                    basic: fields.object({
                        name: fields.text({ label: 'Name' }),
                        role: fields.text({ label: 'Designation (Role)' }),
                        description: fields.text({ label: 'Description', multiline: true }),
                    }, { label: 'Basic Information Section' }),
                    socials: fields.object({
                        links: fields.array(
                            fields.object({
                                name: fields.text({ label: 'Name' }),
                                href: fields.url({ label: 'URL' }),
                                icon: fields.text({ label: 'Icon Name (React Icon)' }),
                                color: fields.text({ label: 'Color Hex' }),
                                label: fields.text({ label: 'Aria Label' }),
                            }),
                            {
                                label: 'Social Links',
                                itemLabel: (props) => props.fields.name.value,
                            }
                        ),
                    }, { label: 'Social Links Section' }),
                    hero: fields.object({
                        rolePrefix: fields.text({ label: 'Role Prefix (Above Title)', defaultValue: '' }),
                        titleFirst: fields.text({ label: 'Title (First Part)', defaultValue: 'MAKSUD' }),
                        titleSecond: fields.text({ label: 'Title (Second Part - Accent)', defaultValue: 'HOSSAIN' }),
                        description: fields.text({ label: 'Short Description', multiline: true }),
                        accentColor: fields.text({ label: 'Hero Accent Color', defaultValue: '#FDC435' }),
                    }, { label: 'Hero Section' }),
                    about: fields.object({
                        label: fields.text({ label: 'Section Label', defaultValue: 'My Narrative' }),
                        headingNormal: fields.text({ label: 'Heading (Normal)', defaultValue: 'THE INTERSECTION OF PRECISION &' }),
                        headingItalic: fields.text({ label: 'Heading (Italic)', defaultValue: 'EXPLORATION.' }),
                        stat1Value: fields.text({ label: 'Stat 1 Value', defaultValue: '5+' }),
                        stat1Label: fields.text({ label: 'Stat 1 Label', defaultValue: 'Years Testing' }),
                        stat2Value: fields.text({ label: 'Stat 2 Value', defaultValue: '200k+' }),
                        stat2Label: fields.text({ label: 'Stat 2 Label', defaultValue: 'Moments Captured' }),
                        accentColor: fields.text({ label: 'About Accent Color', defaultValue: '#FDC435' }),
                    }, { label: 'My Narrative Section' }),
                    experience: fields.object({
                        label: fields.text({ label: 'Section Label', defaultValue: 'Professional Path' }),
                        headingNormal: fields.text({ label: 'Heading (Normal)', defaultValue: 'PROFESSIONAL' }),
                        headingAccent: fields.text({ label: 'Heading (Accent)', defaultValue: 'JOURNEY.' }),
                        accentColor: fields.text({ label: 'Experience Accent Color', defaultValue: '#FDC435' }),
                    }, { label: 'Professional Path Section' }),
                    education: fields.object({
                        label: fields.text({ label: 'Section Label', defaultValue: 'Academic Excellence' }),
                        headingNormal: fields.text({ label: 'Heading (Normal)', defaultValue: 'SCHOLASTIC' }),
                        headingAccent: fields.text({ label: 'Heading (Accent)', defaultValue: 'PURSUITS.' }),
                        accentColor: fields.text({ label: 'Education Accent Color', defaultValue: '#FDC435' }),
                    }, { label: 'Academic Excellence Section' }),
                    photography: fields.object({
                        label: fields.text({ label: 'Section Label', defaultValue: 'Visual Journal' }),
                        headingNormal: fields.text({ label: 'Heading (Normal)', defaultValue: 'STILL' }),
                        headingAccent: fields.text({ label: 'Heading (Accent)', defaultValue: 'MOMENTS.' }),
                        description: fields.text({ label: 'Description', multiline: true, defaultValue: 'Capturing the world through my lens. From urban streets to serene nature, every photo tells a unique story.' }),
                        accentColor: fields.text({ label: 'Photography Accent Color', defaultValue: '#FDC435' }),
                    }, { label: 'Photography Section' }),
                    blog: fields.object({
                        label: fields.text({ label: 'Section Label', defaultValue: 'Travel Chronicles' }),
                        headingNormal: fields.text({ label: 'Heading (Normal)', defaultValue: 'DISPATCHES FROM THE' }),
                        headingAccent: fields.text({ label: 'Heading (Accent)', defaultValue: 'ROAD.' }),
                        description: fields.text({ label: 'Description', multiline: true, defaultValue: 'In-depth stories, travel tips, and cultural insights from my journeys around the globe.' }),
                        accentColor: fields.text({ label: 'Blog Accent Color', defaultValue: '#FDC435' }),
                    }, { label: 'Blog Section' }),
                    footer: fields.object({
                        titleNormal: fields.text({ label: 'Title (Normal)', defaultValue: "LET'S CONNECT" }),
                        titleAccent: fields.text({ label: 'Title (Accent)', defaultValue: "TOGETHER." }),
                        description: fields.text({ label: 'Description', multiline: true, defaultValue: "Want to chat? I'm always open to discussing new opportunities and creative ideas." }),
                        buttonText: fields.text({ label: 'Button Text', defaultValue: "Let's Talk" }),
                        email: fields.text({ label: 'Email Address', defaultValue: "maksudpranto@gmail.com" }),
                        accentColor: fields.text({ label: 'Footer Accent Color', defaultValue: '#FDC435' }),
                    }, { label: 'Footer Section' }),
                })
            },
        }),
    },
});
