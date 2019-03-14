const defaultValue = [{
    userInfo: {
        avatar: 'https://s10.mogucdn.com/mlcdn/c45406/180930_634a7ck1ikea6k139lbgbi343ha2c_150x150.jpg',
        username: '',
        abstract: false
    },
    topic: {
        topicImgList: [],
        createdAt: '',
        topicLikeCounts: 0 // 点赞数
    },
    discuss: [],
}];

const topicList = (state = defaultValue, action) => {
    switch (action.type) {
        case 'ADD_TOPICLIST':
            return [...action.info];
        case 'TOPIC_LIKE':
            return topicLike(state, action.info);
        case 'ADD_COMMENT':
            return addComments(state,action.info)
        default:
            return state;
    }
}

// 点赞
function topicLike (state, { index, topicLikeCounts, topicLike }) {
    const newArray = [...state];
    const targetTopic = newArray[index].topic;
    Object.assign(targetTopic, {
        topicLikeCounts,
        topicLike
    });
    return newArray;
}

function addComments (state, { index, replyName, replyContent }) {
    const newArray = [...state];
    const comment = {
        replyName,
        replyContent,
    };
    newArray[index].discuss.push(comment);
    return newArray;
}

export default topicList;
