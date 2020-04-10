/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */

import {MergeResolverInterface} from "@framework/Modules/Api/Resource/MergeResolverInterface";

export class GraphQLResolver implements MergeResolverInterface {
    resolver(resource: string, content: string[]): string {
        return content.join("\n");
    }
}
