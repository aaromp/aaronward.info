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
        color: #353535;
        background-color: rgba(239, 237, 249, 1);
        border-radius: 16px;
        margin: 5.6rem auto 3.2rem auto;
        padding: 3.2rem 3.2rem 1.6rem 3.2rem;

        @media (min-width: 1170px) {
            font-size: 1.4rem;
            line-height: 2.2rem;
            position: sticky;
            top: 12.8rem;
            min-width: 300px;
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
        overflow: hidden;
        position: relative;
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
        display: inline-block;
        box-shadow: none;
        color: ${props => (props.state.isActive ? `#4027BD` : `inherit`)} !important;
        text-decoration: none;

        &:hover {
            color: #4027BD  !important;
            text-decoration: none;
            box-shadow: none;
        }

        & {
            position: relative;
            margin: 0 2rem 0 3.2rem;
        }
        @media (max-width: 1170px) {
            & {
                position: relative;
                margin: 0;
            }
        }

        &::before {
            content: '👁';
            position: absolute;
            top: 0.2rem;
            left: -4rem;
            visibility: ${props => (props.state.isActive ? `visible` : `hidden`)};;
        }
    }
`
