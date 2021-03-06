// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {loadChannelsByTeamName} from '@actions/views/channel';
import {getPostThread} from '@actions/views/post';
import {selectFocusedPostId, selectPost} from '@mm-redux/actions/posts';
import {clearSearch, getFlaggedPosts} from '@mm-redux/actions/search';
import {getTheme} from '@mm-redux/selectors/entities/preferences';
import {makePreparePostIdsForSearchPosts} from '@selectors/post_list';

import FlaggedPosts from './flagged_posts';

function makeMapStateToProps() {
    const preparePostIds = makePreparePostIdsForSearchPosts();
    return (state) => {
        const postIds = preparePostIds(state, state.entities.search.flagged);

        return {
            postIds,
            theme: getTheme(state),
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            clearSearch,
            loadChannelsByTeamName,
            getPostThread,
            getFlaggedPosts,
            selectFocusedPostId,
            selectPost,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(FlaggedPosts);
