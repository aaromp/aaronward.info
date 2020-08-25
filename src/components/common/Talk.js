import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

/**
*
* Credits to 👉🏼 https://nehalist.io/adding-commento-to-react-apps-like-gatsby/#commento-login-box-container
*
*/

// Helper to add scripts to our page
const insertScript = (talkURL, storyID, storyURL, id, parentElement) => {
    const script = window.document.createElement(`script`)
    script.async = false
    script.defer = true
    script.src = `${talkURL}/assets/js/embed.js`
    script.id = id
    script.onload = function() {
        Coral.createStreamEmbed({
            id: "coral_thread",
            autoRender: true,
            rootURL: talkURL,
            // Uncomment these lines and replace with the ID of the
            // story's ID and URL from your CMS to provide the
            // tightest integration. Refer to our documentation at
            // https://docs.coralproject.net for all the configuration
            // options.
            storyID: storyID,
            // storyURL: storyURL,
        })
    }
    parentElement.appendChild(script)

    return script
}

// Helper to remove scripts from our page
const removeScript = (id, parentElement) => {
    const script = window.document.getElementById(id)
    if (script) {
        parentElement.removeChild(script)
    }
}

// The actual component
const Talk = ({ id, talkURL, storyID, storyURL }) => {
    useEffect(() => {
        // If there's no window there's nothing to do for us
        if (!window || !talkURL) {
            return
        }
        const document = window.document
        // In case our #commento container exists we can add our commento script
        if (document.getElementById(`coral_thread`)) {
            //url: <your comment url>
            insertScript(talkURL, storyID, storyURL, `talk-script`, document.body)
        }

        // Cleanup remove the script from the page
        /* eslint-disable consistent-return */
        return () => removeScript(`talk-script`, document.body)
    }, [id, talkURL])

    return <div id={`coral_thread`} />
}

Talk.propTypes = {
    id: PropTypes.string.isRequired,
    talkURL: PropTypes.string.isRequired,
    storyID: PropTypes.string.isRequired,
    storyURL: PropTypes.string.isRequired,
}

export default Talk
