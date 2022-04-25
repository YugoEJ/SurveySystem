import React from 'react';

import * as SurveyCreator from 'survey-creator-react';
import 'survey-core/survey.i18n.js';
import 'survey-creator-core/survey-creator-core.i18n.js';
import 'survey-core/defaultV2.css';
import 'survey-creator-core/survey-creator-core.css';
import service from '../api';

function Creator() {
    const saveSurvey = () => {
        const survey = creator.text;
        service.SurveyService.saveSurvey(survey).then(response => {
            console.log(response);
        });
    };

    const creatorOptions = {};
    const creator = new SurveyCreator.SurveyCreator(creatorOptions);
    creator.JSON = {
        completedHtml:
            '<h3>Thank you for your feedback.</h3><h5>Your thoughts and ideas will help us to create a great product!</h5>',
        completedHtmlOnCondition: [
            {
                expression: '{nps_score} > 8',
                html: '<h3>Thank you for your feedback.</h3><h5>We glad that you love our product. Your ideas and suggestions will help us to make our product even better!</h5>',
            },
            {
                expression: '{nps_score} < 7',
                html: '<h3>Thank you for your feedback.</h3><h5> We are glad that you share with us your ideas.We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5><br />',
            },
        ],
        pages: [
            {
                name: 'page1',
                elements: [
                    {
                        type: 'rating',
                        name: 'nps_score',
                        title: 'On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?',
                        isRequired: true,
                        rateMin: 0,
                        rateMax: 10,
                        minRateDescription: '(Most unlikely)',
                        maxRateDescription: '(Most likely)',
                    },
                    {
                        type: 'checkbox',
                        name: 'promoter_features',
                        visible: false,
                        visibleIf: '{nps_score} >= 9',
                        title: 'What features do you value the most?',
                        isRequired: true,
                        validators: [
                            {
                                type: 'answercount',
                                text: 'Please select two features maximum.',
                                maxCount: 2,
                            },
                        ],
                        choices: ['Performance', 'Stability', 'User Interface', 'Complete Functionality'],
                        hasOther: true,
                        otherText: 'Other feature:',
                        colCount: 2,
                    },
                    {
                        type: 'comment',
                        name: 'passive_experience',
                        visible: false,
                        visibleIf: '{nps_score} > 6  and {nps_score} < 9',
                        title: 'What is the primary reason for your score?',
                    },
                    {
                        type: 'comment',
                        name: 'disappointed_experience',
                        visible: false,
                        visibleIf: '{nps_score} notempty',
                        title: 'What do you miss and what was disappointing in your experience with us?',
                    },
                ],
            },
        ],
        showQuestionNumbers: 'off',
    };
    creator.saveSurveyFunc = saveSurvey;

    return <SurveyCreator.SurveyCreatorComponent creator={creator} />;
};

export default Creator;
