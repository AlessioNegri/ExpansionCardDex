import { ElementType, parseDocument } from 'htmlparser2';
import { AnyNode, Element, Document } from 'domhandler';

import { CardData } from '../interfaces/ItemCard.types';

/**
 * @brief Recursive search of HTML tag
 * 
 * @param node Node element
 * @param tag Tag name
 * @returns Found element
 */
const findElementByTag = (node: AnyNode, tag: string): Element | null =>
{
    if (node.type === ElementType.Tag)
    {
        const element: Element = node as Element;

        if (element.name === tag) return element;
    }

    if ('children' in node && node.children)
    {
        for (const child of node.children)
        {
            const found: Element | null = findElementByTag(child, tag);

            if (found) return found;
        }
    }

    return null;
};

/**
 * @brief Recursive search of HTML id
 * 
 * @param node Node element
 * @param id Id value
 * @returns Found element
 */
const findElementById = (node: AnyNode, id: string): Element | null =>
{
    if (node.type === ElementType.Tag)
    {
        const element: Element = node as Element;

        if (element.attribs?.id === id) return element;
    }

    if ('children' in node && node.children)
    {
        for (const child of node.children)
        {
            const found: Element | null = findElementById(child, id);

            if (found) return found;
        }
    }

    return null;
};

/**
 * @brief Retrieve the text value in node data
 * 
 * @param node Node element
 * @returns Text value
 */
const getTextContent = (node?: AnyNode | null): string =>
{
    if (!node) return '';

    if (node.type === ElementType.Text) return node.data;

    if ('children' in node && node.children)
    {
        return node.children.map(getTextContent).join('');
    }

    return '';
};

/**
 * @brief Recursive search of 'Tendenza di prezzo' value
 * 
 * @param element Element to search into
 * @returns Price trend value
 */
const extractPriceTrend = (element: Element | null): string | null =>
{
    if (!element?.children) return null;

    let lastDtWasTrend: boolean = false;

    const walk = (node: AnyNode): string | null =>
    {
        if (node.type === ElementType.Tag)
        {
            const subElement: Element = node as Element;
            
            // * 1. Find <dt> element with text 'Tendenza di prezzo'

            if (subElement.name === 'dt')
            {
                const text: string = getTextContent(subElement).trim();

                lastDtWasTrend = (text === 'Tendenza di prezzo');
            }

            // * 2. Find next <dd> element containing the value

            if (lastDtWasTrend && subElement.name === 'dd')
            {
                return getTextContent(subElement).trim();
            }
        }

        if ('children' in node && node.children)
        {
            for (const child of node.children)
            {
                const result: string | null = walk(child);

                if (result) return result;
            }
        }

        return null;
    };

    return walk(element);
};

/**
 * @brief Retrieve the card url for fetching
 * 
 * @param expansionCode Code for the expansion
 * @param card Card data
 * @returns Card URL
 */
const getCardUrl = (expansionCode: string, card: CardData): string =>
{
    const cardName: string = card.name.replaceAll(' ', '-').replaceAll('\'', '');

    const url: string = 'https://www.cardmarket.com/it/Pokemon/Products/Singles';

    switch (expansionCode)
    {
        case 'SB':  return `${url}/Base-Set/${cardName}-[PH]BS${card.id.replaceAll('0', '')}`;
        case 'JU':  return `${url}/Jungle/${cardName}-[PH]JU${card.id.replaceAll('0', '')}`;
        case 'FO':  return `${url}/Fossil/${cardName}-[PH]FO${card.id.replaceAll('0', '')}`;
        case 'B2':  return `${url}/Base-Set-2/${cardName}-[PH]B2${card.id.replaceAll('0', '')}`;
        case 'TR':  return `${url}/Team-Rocket/${cardName}-[PH]TR${card.id.replaceAll('0', '')}`;
        case 'G1':  return `${url}/Gym-Heroes/${cardName}-[PH]GH${card.id.replaceAll('0', '')}`;
        case 'G2':  return `${url}/Gym-Challenge/${cardName}-[PH]GC${card.id.replaceAll('0', '')}`;
        case 'N1':  return `${url}/Neo-Genesis/${cardName}-[PH]NG${card.id.replaceAll('0', '')}`;
        case 'N2':  return `${url}/Neo-Discovery/${cardName}-[PH]NDI${card.id.replaceAll('0', '')}`;
        case 'N3':  return `${url}/Neo-Revelation/${cardName}-[PH]NR${card.id.replaceAll('0', '')}`;
        case 'N4':  return `${url}/Neo-Destiny/${cardName}-[PH]NDE${card.id.replaceAll('0', '')}`;
        case 'MEG': return `${url}/Mega-Evolution/${cardName}-[PH]MEG${card.id}`;
        case 'PFL': return `${url}/Phantasmal-Flames/${cardName}-[PH]PFL${card.id}`;

        default: return '';
    }
};

/**
 * @brief Rertrieve the price of the given card
 * 
 * @param url Card url
 * @returns Card price
 */
const fetchCardPriceByVersion = async (url: string, version: string): Promise<string | null> =>
{
    if (url.includes('[PH]')) url = url.replace('[PH]', version);
    
    const response = await fetch(url);

    const html: string = await response.text();

    const document: Document = parseDocument(html);

    const h1: Element | null = findElementByTag(document, 'h1');

    const cardName: string | null = h1?.children?.map(child => child.type === ElementType.Text ? child.data : '').join('').trim() ?? null;

    const table: Element | null = findElementById(document, 'tabContent-info');

    const priceTrend: string | null = extractPriceTrend(table);

    return priceTrend;
};

/**
 * @brief Rertrieve the price of the given card
 * 
 * @param expansionCode Code for the expansion
 * @param card Card data
 * @returns Card price
 */
const fetchCardPrice = async (expansionCode: string, card: CardData): Promise<string> =>
{
    const url: string = getCardUrl(expansionCode, card);

    if (url === '') return '';

    try
    {
        let priceTrend: string | null = await fetchCardPriceByVersion(url, '');

        if (priceTrend === null) priceTrend = await fetchCardPriceByVersion(url, 'V1-');

        if (priceTrend === null) priceTrend = await fetchCardPriceByVersion(url, 'V2-');

        if (priceTrend === null) priceTrend = await fetchCardPriceByVersion(url, 'V3-');

        if (priceTrend === null) priceTrend = await fetchCardPriceByVersion(url, 'V4-');

        return priceTrend ?? '';
    }
    catch (err)
    {
        console.error(err);
    }

    return '';
};

export default fetchCardPrice;