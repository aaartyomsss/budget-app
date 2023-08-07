# BudgIt App

This project was created as a part of University of Helsinki Full-stack WebDev course. The work was going smoothly up until September 2021 and then has abrubtly ended.

Now, over a year has passed an it is time to get back to it.

## App description and where it could be found

## Quick remarks after the submission for 7 credits.

After submission there will still be work on the project as I would like to continue developing it for personal use. So please for grading refer to main branch. There are still 2 key issues in my opinion that are present in this project:

    a. Minor security vulnerabilities. While main points are resolved from what I have gathered, there is still a lot of
    'openly' accessible endpoints, which should not happen and auth related issues.
    b. Low test coverage on the backend and non-existed testing on the frontend.

Once those issues are resolved, new features for the app will be developed.

That is all,
Thank you in advance for reviewing my project.
Will be happy to get a feedback.

## Time spent

Well, when starting out I was at times not too specific with the categories, but either ways let me write down everything that was done before September 2021

1. Initializing backend - 0.5h
2. Login/ Signup backend - 1h
3. Google auth - 4h
4. Frontend login - 1.2h
5. Logout + signup - 2.5h
6. Email confirmation - 2.25h
7. Backend personal plan - 2h
8. Fixing nodemon - 1h
9. _Most vague category - includes practically all frontend work_ Frontend personal plan - 27.5h
10. Change password UI + Backend - 1h
11. Code refactoring and bug fixing - 10h
12. Dockerizing app - 6h (yes, at the time it was a difficult task for me)
13. Redis - 2h
14. Merge of 2 user models into a single one - 1h
15. Dockerizing and configuring ES. Elasticsearch query to find users by username - 2.5h
16. Setting up test env - 1h
17. Family plan reducer and creation - 1.5h (starting from this point I apparently saw the document on how logging of hours should be done)
18. FamilyPlanHome Frontend - 3.5h
19. FrontEnd Invitation mechanism + some styling - 2.5h
20. Frontend accept invitations mechanism + styling - 5.5h

Now starts the part of 2022 development:

21. Basic unit tests for reducers - 0.5h
22. Fixing login/ sign up styling + setting up proper nodemailer environment - 0.75h
23. Add expenses to family plan - 0.5h

Intially, whilst being a lazy programmer - I was all for the JS. After working for some time in the industry and taking a deep dive into the TS, I have realised how important typing is. After not touching the project for over a year it is also a challenge to revive and maintain it. Thus, the decision was made that maybe it is for the best to migrate slowly everything to typescript:

24. TS migration - 0.5h
25. Setting up CI/CD pipeline - 0.25h
26. ESlint configuration + fixes - 0.5h
27. Add extra steps to pipeline - 0.25h
28. Typescript migration debugging - 1.25h (Thre is smth wrong with webpack)
29. Migrate CRA/ Webpack to Vite - 4.25h (problem was in npm version + js extensions)
30. Fix TS errors and general code improvements - 2h
31. Resolving merge conflicts - 0.25h
32. Fix eslint - 0.5h
33. Dockerizing mongo - 3.5h
34. Backend unit tests initialization - 2.5h

^^^ The intiializaiton of testing has taken such a long time due to having issue with mongo.sh script. After a long time of debugging had to set it to js file.
Downside is that I simply cannot pass .env variables to it, which is quite bad from data exposure POV. So technically, will have to either comment js script out or
push it without the sensitive variables.

35. NGINX production setup and dev env fixes + mongoDB fixes - 7h
36. Continue to work on the tests setup - 2.25h

^^^ There was some hardcore connection related bug, which is worked around by
disconnecting from DB in the beforeEach block first.

37. Add reusable permission check for user to be authenticated + backend tests - 0.5h
38. Fix personal plan fetching in frontend + refactor the plan retrieval endpoint - 0.5h
39. Add error handling to SpendingForm.tsx - 1h
40. Fixing auth header not being set on any route besides '/' - 0.75h
41. Fix listing of expenses - 0.75h
42. Family plan listing improvements and fixes - 6.0h

    included:

    a. Addition of endpoints and backend tests for familyPlanRouter

    b. Refactoring of spending form functionality

    c. Add expense in frontend

    d. Adapt CustomSelectCategory to family plans

    e. Deletion of the expense in the plan

    f. Patching of the expense

    g. General small fixes

43. Modify family expense and mamual testing - 0.5h
44. Improve login and signup forms mobile UI - 0.5h
45. Overview functionality fixes (tech and styling) - 0.5h
46. Adjust mobile styling for expenses overview - 0.25h
47. Extend overview functionality - 1.5h
48. Family plan UI changes and fixes - 2.25h

    included:

    a. Add user column to the plan

    b. Fix bug that allows inviting user to the same plan

    c. General UI fixes

    d. Decline button does nothing

    e. Categories do not work on page refresh

49. Deployment - 6.5h

    NB! The main problem was that initially the choice for deployment was Azure, but once everything was already set up - I found out that free tier supports only
    3 or 4 services running at once, whilst I had 6... So I had to change the the hosting to some random provider (kamatera, mainly as it was cheap). It is a simple
    docker-compose up type deployment. At last pointing the domain name to the ip also has taken some time.

50. Refactor google login to the library which is not depricated - 1.5h

51. Additional fixes to the deployment - 1h

52. Fixes after manual testing by users - 0.25h

CURRENT: 126.5h + Some other fixes through the deployment

GOAL: 122.5h
