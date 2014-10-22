%% Make all pages

cd /Users/Gene/Web/Home
addpath('util');

makeStaticPage( 'components/home_main.txt',                        'index.html' );
makeStaticPage( 'components/about.txt',                            'about.html' );
makeStaticPage( 'components/writing.txt',                          'writing/index.html' );

makeStaticPage( 'components/post_tip-of-the-tongue.txt',           'works/tip-of-the-tongue.html' );
makeStaticPage( 'components/post_along-the-karakoram.txt',         'works/along-the-karakoram.html' );
makeStaticPage( 'components/post_the-rub.txt',                     'works/the-rub.html' );
makeStaticPage( 'components/post_mosaic.txt',                      'works/mosaic.html' );
makeStaticPage( 'components/post_a-day-in-new-york.txt',           'works/a-day-in-new-york.html' );
makeStaticPage( 'components/post_accordions.txt',                  'works/accordions.html' );
makeStaticPage( 'components/post_audio-sculpture.txt',             'works/audio-sculpture.html' );
makeStaticPage( 'components/post_bezier-ribbons.txt',              'works/bezier-ribbons.html' );
makeStaticPage( 'components/post_branching.txt',                   'works/branching.html' );
makeStaticPage( 'components/post_color-of-words.txt',              'works/color-of-words.html' );
makeStaticPage( 'components/post_flocking.txt',                    'works/flocking.html' );
makeStaticPage( 'components/post_interference.txt',                'works/interference.html' );
makeStaticPage( 'components/post_kaleidoscopes.txt',               'works/kaleidoscopes.html' );
makeStaticPage( 'components/post_listening-to-the-ocean.txt',      'works/listening-to-the-ocean.html' );
makeStaticPage( 'components/post_lost-in-translation.txt',         'works/lost-in-translation.html' );
makeStaticPage( 'components/post_meditation.txt',                  'works/meditation.html' );
makeStaticPage( 'components/post_pop-chemistry.txt',               'works/pop-chemistry.html' );
makeStaticPage( 'components/post_printer-remixed.txt',             'works/printer-remixed.html' );
makeStaticPage( 'components/post_robot-shakespeare.txt',           'works/robot-shakespeare.html' );
makeStaticPage( 'components/post_scratchML.txt',                   'works/scratchML.html' );
makeStaticPage( 'components/post_scripting-photoshop.txt',         'works/scripting-photoshop.html' );
makeStaticPage( 'components/post_sonic-self-portrait.txt',         'works/sonic-self-portrait.html' );
makeStaticPage( 'components/post_stars.txt',                       'works/stars.html' );
makeStaticPage( 'components/post_tidy-photography.txt',            'works/tidy-photography.html' );
makeStaticPage( 'components/post_timelapse-cubism.txt',            'works/timelapse-cubism.html' );
makeStaticPage( 'components/post_tree.txt',                        'works/tree.html' );
makeStaticPage( 'components/post_vertex-rivers.txt',               'works/vertex-rivers.html' );
makeStaticPage( 'components/post_xinjiang-hunza-compilation.txt',  'works/xinjiang-hunza-compilation.html' );

%% generate rss

rss_generate('rss/rss2.xml');

%% generate blog pages

wpost = makeBlogPosts();
makeStaticPage(wpost, 'writing/index.html');

%% Generating a new page
%
% Process:
%  1) create new content
%  2) update works/experiments
%  3) update rss
%  4) upload
%      - content
%      - main/experiments page
%      - rss
%      - any images/code/etc referenced
%

newpage = 'components/writing_post_intro-to-logger.txt';
destination = 'writing/intro-to-logger.html';

cd /Users/Gene/Web/Home
addpath('util');
makeStaticPage( newpage, destination );
makeStaticPage( 'components/home_main.txt', 'index.html' );
rss_generate('rss/rss2.xml');
