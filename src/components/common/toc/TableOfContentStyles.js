import { Link } from 'gatsby'
import styled from "styled-components"

/*
 * Due to global scoping with html.casper, global style have high specificity
 * https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
*/
export const TocAside = styled.aside`
    && {
        order: 1;
        font-family: var(--font-body);
        color: #78757A;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 5px;
        margin: 5.6rem auto 3.2rem auto;

        @media (min-width: 1170px) {
            font-size: 1.4rem;
            line-height: 2.2rem;
            position: sticky;
            top: 12.8rem;
            min-width: 260px;
            padding: 0 2.4rem;
            margin-left: 2.4rem;
            margin-top: 0;
        }
    }
`
export const TocTitle = styled.h2`
    &&& {
        font-family: var(--font-body);
        font-weight: var(--font-bold);
        text-transform: uppercase;

        margin-top: 1.2rem;
        margin-bottom: 2rem;

        @media (min-width: 1170px) {
          font-size: 1.6rem;
          line-height: 2.4rem;
        }
    }
`
export const TocList = styled.ul`
    &&& {
        overflow:hidden;
        position:relative;
        list-style: none;
        margin:0;
        padding:0;
        margin-top: -1.6rem;
        margin-bottom: 2.0rem;
        padding-top: 0.6rem;
        padding-left: 0.9rem;
    }
`
export const TocListSub = styled.ul`
    &&& {
        margin-top: 0.5rem;
        padding-left: 1.6rem;
        margin-bottom: 0.1rem;
    }
`
export const TocItem = styled.li`
    &&& {
        list-style: none;
        margin-bottom: calc(1.5rem / 2);
    }
`
export const TocLink = styled.a`
    &&& {
        height: 100%;
        box-shadow: none;
        color: ${props => (props.state.isActive ? `#4B922A` : `inherit`)} !important;
        border-bottom: ${props => (props.state.isActive ? `1px solid #4B922A` : `none`)};
        text-decoration: none;

        &:hover {
            color: #4B922A  !important;
            border-bottom: 1px solid #4B922A;
            text-decoration: none;
            box-shadow: none;
        }

        &::before {
            background-color: #EEE;
            content:' ';
            display: inline-block;
            height: inherit;
            left: 0;
            position:absolute;
            width: 2px;
            margin-left: 1px;
        }

        &::before {
            background-color: ${props => (props.state.isActive ? `#4B922A` : `#EEE`)};
        }
    }
`
