export const getAnimeResponse = async(resource, query) => {
    const url = query 
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}`;
    const response = await fetch(url, { cache: 'no-store' })
    const anime = await response.json()
    return anime
}

export const getNestedAnimeResponse = async(resource, objectProperty) => {
    const response = await getAnimeResponse(resource)
    return response.data?.flatMap(item => item[objectProperty])
}

export const reproduce = (data, gap) => {
    if (!data || !data.length) return { data: [] }
    
    if (data.length <= gap) {
        return { data: data }
    }

    const first = Math.floor(Math.random() * (data.length - gap + 1))
    const last = first + gap

    return { data: data.slice(first, last) }
}

export const translateText = async (text, from = 'en', to = 'id') => {
    if (!text) return text;
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
        const response = await fetch(url);
        const result = await response.json();
        return result[0].map(s => s[0]).join('');
    } catch (error) {
        console.error("Translation error:", error);
        return text; // Fallback to original text if translation fails
    }
}