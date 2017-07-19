# FoodAmore

FoodAmore is the app to inspire every chef, cook, parent, and food lover to make more of what they love. It is the app to save all of one’s recipes and have easy access to them.

### Introduction

Users will have to sign up and login in order to create their own cook books to save recipes. With a cook book, users can create, save, and manage all of their recipes. When saving a new recipe, recipes are divided into four sections of ingredients, instructions, notes, and images/videos. You can add an associated how-to video, which will link that video to the recipe for easy access to it, so that it can be played while looking at the given recipe. Recipes can be tagged with categories that will then accumulate the recipes into lists. Lists will group recipes together based on tags making it easier for users to manage and look through types of recipes.

Users can search all of their recipes to find a specific recipe. Then what if you have ingredients but are not sure what to make from them? The search functionality will also search for ingredients and find the recipes that use them. That way, users can be inspired with what they have available. Search multiple ingredients to get closer to the best suggestion. If you are still missing ingredients for a recipe, then you can create a shopping list for reference when you go grocery shopping.


### ER Diagrams
[Link to ERD on LucidChart](https://www.lucidchart.com/invitations/accept/9148f2b5-0a24-4060-997c-1b6af3451852)


### Wireframes
[Link to Mockup on FluidUI](https://www.fluidui.com/editor/live/preview/p_32GwCDtsKx1uQ82sA88v1zLGbIW1ztAo.1500470458555)

[With Component Markup](https://www.dropbox.com/s/pzctqnd03n8f9z1/FoodAmore%20Framework%20Component%20MockUp.pdf?dl=0)


### Technologies
+ Twilio API
+ Spoonacular API
+ and possibly more

### States
```javascript
state = {
  lists: [], //user lists used on welcome
  recipes = [], //recipes to be shown, used by welcome & lists
  recipe = [], //single recipe used at in the recipe detail
  ingredients = [], //ingredients for a single recipe
  instructions = [], //instructions for a single recipe
}
```
