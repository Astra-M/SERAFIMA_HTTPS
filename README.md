Сделать
Графика
Изображения готовятся под 3 стандартных размера экрана - 320, 768 и 1280 пикс, для одинарной и двойной плотности пикселей (640 (320х2), 1536 (768х2), 2560 (1280х2) пикс ).

сейчас макс размер картики 400 пикс, но если большие экраны, то она будет больше
нужно уменьшить размеры родителя, чтобы не увеличивался размер картинки
Верстка
таблица сверстана через тег table
вставка svg через спрайты, для возможности управлять стилями (при ховере меняется цвет иконки)
обрезка текста многоточием на второй строке
декоративные линии под заголовками не hr, а псевдоэлементом after
навигационные кнопки созданы тегом <a>, и стилизованы под кнопки
заголовки для скринридеров сделать, с визибилити хидден
сделать единые классы кнопок и заголовков
Для вёрстки от мобильных (mobile first) лучше использовать медиавыражения с min-width и располагать их в порядке увеличения ширины экрана;
футер прижат к низу экрана, независимо от возможной высоты футера. Пустое пространство между футером и небольшим контентом.

HTML

    Аккуратная разметка HTML. Предлагаем использовать Prettier для автоформатирования кода.
    Валидный HTML, например:

        нет незакрытых тегов, которые нужно закрывать;
        списки свёрстаны правильно, внутри тегов списка находятся только пункты списка;
        нет ошибок вложенности.
        Валидность HTML можно проверить в этом валидаторе.
    Стили подключены в правильном порядке: сначала шрифты, затем глобальные стили, затем собственные.
    Язык страницы указан корректно.
    Задано подходящее значение title.
    Используется семантическая разметка:

        теги <header>, <main>, <footer>, <section>, <nav> использованы по назначению. Ими выделены соответствующие секции страницы;
        для вёрстки заголовков применяются теги от <h1> до <h6>, текстовые блоки размечены тегами <p>, списки — <ul> и <li>;
        есть многоуровневость заголовков;
        есть единственный заголовок первого уровня;
        для блоков, содержащих информацию, используются соответствующие ей смысловые семантические теги, например, <article>, <address>, <time> или другие при необходимости;
        логотип, если он есть на странице, обёрнут в ссылку;
        ссылки на номер телефона и почту, если они есть на странице, снабжены префиксами в значении атрибутов href;
    Для обозначения абзаца не используется тег переноса строки.
    У всех изображений задан атрибут alt с описанием на языке страницы.

CSS

    Аккуратное форматирование кода:

        между селекторами и открывающими скобками стоит пробел,
        каждое правило начинается с новой строки,
        стоят точки с запятой,
        закрывающие скобки вынесены на отдельную строку.
    Соблюдены требования к именованию CSS классов:

        для CSS классов выбраны подходящие по смыслу имена;
        отсутствует слитное написание слов в именах классов;
        единообразное разделение слов в именах CSS-классов во всём проекте, например, используется только kebab-case — разделение слов знаком - или camelCase — разделение слов регистром символов;
        в именах не используется транслитерация и сокращения, которые не являются общеупотребимыми.
        Если в брифе к проекту описаны имена классов, то старайтесь использовать их.
    У body и типовых элементов сбрасываются браузерные отступы.
    Для всех элементов сайта корректно заданы:

        цвета фона,
        размеры,
        межстрочные расстояния,
        межбуквенные расстояния и расстояния между словами при необходимости.
    Корректно используются шрифты:

        разные форматы шрифтов подключаются в правильном порядке — от самых современных к более старым с указанием формата как свойства CSS;
        указаны альтернативные шрифты;
        семейство, вес, начертание и размеры шрифтов во всех элементах страницы соответствуют заданным в макете.
    Правильно организован лейаут страницы:

        для организации лейаута ключевых блоков использован flex или grid;
        корректно отцентрированы необходимые элементы на странице;
        не задана фиксированная высота и ширина элементов там, где их можно не использовать или применены минимальные или максимальные значения. Блок растягивается, если в него вставлено в два-три раза больше контента;
        абсолютное позиционирование используется только там, где нельзя применить статичное или относительное позиционирование;
        контекст позиционирования указан корректно (например, position: relative у нужного элемента);
        корректно задано свойство z-index, нет спрятавшихся элементов;
        нет лишних отступов у первых и последних элементов в списках и блоках с абзацами.
    Корректно реализована адаптивная верстка:

        установлена максимальная и минимальная ширина контента в соответствии с макетом;
        брейкпоинты сгруппированы. Если два брейкпоинта имеют небольшую пиксельную разницу в медиаправиле, они объединены в один;
        между брейкпоинтами используется «резиновая» вёрстка;
        правильно определены «резиновые» и статические размеры;
        одинаковые свойства в разных медиаправилах не дублируются.
    Нет пустых CSS-правил.
    Нет дублирующихся селекторов.
    Нет дублирующихся свойств внутри CSS-правил.
    CSS-переменные корректно заданы и переопределены, используются запасные значения.
    Стили одинаковых элементов не дублируются, а переиспользуются.
    Не используются инлайновые стили в HTML.

Хорошие практики
В этом списке собраны приёмы, которые помогут сделать проект ещё лучше. На данном этапе их использовать необязательно — автотесты и ревьюер примут работу без них. Однако такие хорошие практики помогут вам сделать портфолио более профессиональным. Опытные верстальщики обратят на них внимание.

    В разметке нет лишних обёрток <div> у элементов.
    В разметке у ссылок нет пустых атрибутов href.
    Всем изображениям заданы ограничения размеров.
    Для изображений настроена «ленивая» загрузка.
    Элементам не добавлены классы, которые не используются.
    В стилях не указаны неработающие свойства (например, не заданы размеры строчных элементов).
    Для всех элементов на странице переопределено дефолтное значение свойства box-sizing.
    При организации внутренней геометрии блоков внутренние отступы задаются через padding.
    Раскладки flex или grid не применяются без необходимости там, где можно обойтись дефолтным отображением.
    Для задания отступов между элементами flex и grid блоков использован gap вместо margin.
    Нет чрезмерной стилизации. Например, одинаковые размеры прописаны и для обёртки, и для изображения внутри.
    Интерлиньяж задан в относительных единицах измерения.
    Если в проекте используется методология БЭМ, то нет нарушений соглашения по именованию классов и требований методологии. Например:

        применено единообразное разделение имён блоков, элементов и модификаторов во всем проекте;
        элемент не используется вне своего блока;
        нет элементов элементов;
        класс модификатор не используется без указания блока или элемента, который он модифицирует;
        классы модификаторы описывают только модифицированное значение, остальные описаны в стилях блока;
        внешняя геометрия блоков задана через миксы;
    В элементах формы при необходимости используются inherit или currentColor.
    Для предсказуемого поведения инпутов в разных браузерах использован appearance: none;.
    Вместо overflow: scroll использован overflow: auto, чтобы не отображался ненужный скролл.
    Вид курсора меняется при наведении на интерактивные элементы.
    Для наилучшего позиционирования изображения при задании свойства object-fit задаётся также подходящее значение свойства object-position.
    Для стилизации интерактивных элементов используется outline, а не border (outline не влияет на размеры элемента в потоке).
    CSS-правила в коде расположены в примерном соответствии с позицией элементов в разметке.
    Для стилизации используются только селекторы классов, псевдоэлементов и псевдоклассов, если речь не идёт о сбросе браузерных дефолтных стилей.
    Вместо физических CSS-свойств используются логические CSS-свойства; единообразие в типе свойств.
    Для отправки декоративных линий и фонов назад используется z-index: -1.
    В медиавыражениях под ширины экрана используется современный синтаксис задания диапазонов.
    Для реализации лейаута максимально используется сетка, построенная на grid, и её возможности.
    Для создания декоративных элементов используются псевдоэлементы, а не дополнительные теги в разметке.
    Для элементов разметки, не несущих смысловой нагрузки, задаётся атрибут aria-hidden="true”.
    Ссылки на внешние ресурсы открываются в новом окне.
    У ссылок сброшен outline в :focus и заданы стили :focus-visible.
    Используются разные форматы и размеры изображений в элементе <picture>.
