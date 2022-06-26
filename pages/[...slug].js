import Head from "next/head";
import { getData, BROWSERS } from "../lib/fetch";
import { Record } from "../components/Record";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";


const Feature = props => {
    const { record, browser } = props

    return (
        <>
            <Head>
                <title>{record.fields.Name.toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')} | {browser.charAt(0).toUpperCase() + browser.slice(1)}</title>
            </Head>
            <Header />
            <details open>
                <summary className={`p_05em bb_1px pt_2em`}>
                    <strong>
                        {record.fields.Category}
                    </strong>
                </summary>
                <Record
                    record={record}
                    color="red"
                    browser={browser}
                />
            </details>
            <Footer />
        </>
    )
}

export default Feature

export async function getStaticProps({ params }) {
    const records = await getData();
    const [slug, browser] = params.slug

    const record = records.find(r => r.fields.Slug === slug)

    return {
        props: { record, browser: browser || "" },
        revalidate: 10
    };
}

export async function getStaticPaths() {
    const records = await getData();
    const paths = []

    records.forEach(r => {
        const path = { params: { slug: [r.fields.Slug] } }
        paths.push(path)

        BROWSERS.forEach(b => {
            paths.push({ params: { slug: [r.fields.Slug, b.toLowerCase()] } })
        })
    })

    return {
        paths,
        fallback: true
    }
}