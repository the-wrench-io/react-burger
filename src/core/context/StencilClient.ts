declare namespace StencilClient {

    type LocaleId = string;
    type LocalisedContent = string;

    interface Release {
        id: string,
        body: {
            note?: string,
            name: string,
            created: string,
            locales: LocaleReleaseItem[];
            articles: ArticleReleaseItem[];
            links: LinkReleaseItem[];
            workflows: WorkflowReleaseItem[];
            pages: PageReleaseItem[];
        }
    }

    interface LinkReleaseItem extends ReleaseItem {
        value: string;
        contentType: string;
        articles: string;
        labels: LocaleLabel[];
    }
    interface WorkflowReleaseItem extends ReleaseItem {
        value: string;
        articles: string[];
        labels: LocaleLabel[];
    }
    interface LocaleReleaseItem extends ReleaseItem {
        value: string; 
    }
    interface ArticleReleaseItem extends ReleaseItem {
        name: string;
        parentId?: string;
    }
    interface PageReleaseItem extends ReleaseItem {
        locale: string;
        h1: string;
    }
    interface ReleaseItem {
        id: string;
        hash: string;
    }

    interface LocaleLabel {
        locale: LocaleId;     
        labelValue: LocalisedContent; 
    }
}

export default StencilClient;
